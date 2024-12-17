from enum import Enum
from uuid import uuid4
from typing import List, Optional
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import FastAPI, HTTPException, Depends, APIRouter, Request
from sqlalchemy import create_engine, Column, Integer, String, Text, Float

DATABASE_URL = "sqlite:///./shop.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class HandleMaterial(str, Enum):
    wood = "wood"
    plastic = "plastic"
    metal = "metal"
    rubber = "rubber"
    carbon_fiber = "carbon_fiber"

class SteelMaterial(str, Enum):
    stainless_steel = "stainless_steel"
    damascus = "damascus"
    carbon_steel = "carbon_steel"
    titanium = "titanium"
    ceramic = "ceramic"


class KnifeDB(Base):
    __tablename__ = "knives"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    brand = Column(String, nullable=False)
    blade_length = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    handle_material = Column(String, nullable=False)
    steel_type = Column(String, nullable=False)
    images = Column(Text, nullable=False)


Base.metadata.create_all(bind=engine)


class KnifeCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    brand: str
    blade_length: float = Field(..., gt=0)
    weight: float = Field(..., gt=0)
    handle_material: HandleMaterial
    steel_type: SteelMaterial
    images: List[str] = Field(..., min_items=1, max_items=3)

    @validator("images", each_item=True)
    def validate_base64_images(cls, v):
        if not isinstance(v, str) or not v.startswith("data:image/"):
            raise ValueError("Each image must be a valid base64-encoded string starting with 'data:image/'.")
        return v


class KnifeResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    brand: str
    blade_length: float
    weight: float
    handle_material: str
    steel_type: str
    images: List[str]

    class Config:
        from_attributes = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    user = db.query(UserDB).filter(UserDB.token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or missing token.")
    return user


knives_router = APIRouter(prefix="/knives", tags=["Knives"])

@knives_router.get("/", response_model=List[KnifeResponse])
def get_knives(db: Session = Depends(get_db)):
    knives = db.query(KnifeDB).all()
    for k in knives:
        k.images = k.images.split(",")
    return knives


@knives_router.get("/{knife_id}", response_model=KnifeResponse)
def get_knife(knife_id: int, db: Session = Depends(get_db)):
    knife = db.query(KnifeDB).filter(KnifeDB.id == knife_id).first()
    if not knife:
        raise HTTPException(status_code=404, detail="Knife not found.")
    knife.images = knife.images.split(",")
    return knife


@knives_router.post("/", response_model=KnifeResponse)
def create_knife(knife_request: KnifeCreateRequest, db: Session = Depends(get_db)):
    images_str = ",".join(knife_request.images)
    new_knife = KnifeDB(**knife_request.dict(exclude={"images"}), images=images_str)
    db.add(new_knife)
    db.commit()
    db.refresh(new_knife)
    new_knife.images = knife_request.images
    return new_knife


@knives_router.put("/{knife_id}", response_model=KnifeResponse)
def update_knife(knife_id: int, knife_request: KnifeCreateRequest, db: Session = Depends(get_db)):
    knife = db.query(KnifeDB).filter(KnifeDB.id == knife_id).first()
    if not knife:
        raise HTTPException(status_code=404, detail="Knife not found.")
    for key, value in knife_request.dict(exclude={"images"}).items():
        setattr(knife, key, value)
    knife.images = ",".join(knife_request.images)
    db.commit()
    db.refresh(knife)
    knife.images = knife_request.images
    return knife


@knives_router.delete("/{knife_id}")
def delete_knife(knife_id: int, db: Session = Depends(get_db)):
    knife = db.query(KnifeDB).filter(KnifeDB.id == knife_id).first()
    if not knife:
        raise HTTPException(status_code=404, detail="Knife not found.")
    db.delete(knife)
    db.commit()
    return {"message": "Knife deleted."}


class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    token = Column(String, unique=True, nullable=True)


Base.metadata.create_all(bind=engine)


class UserRequest(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    token: Optional[str]

    class Config:
        from_attributes = True


auth_router = APIRouter(prefix="/authorization", tags=["Authorization"])

@auth_router.post("/signup", response_model=UserResponse)
def sign_up(user_request: UserRequest, db: Session = Depends(get_db)):
    existing_user = db.query(UserDB).filter(UserDB.username == user_request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    new_user = UserDB(username=user_request.username, password=user_request.password)
    new_user.token = str(uuid4())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@auth_router.post("/signin", response_model=UserResponse)
def sign_in(user_request: UserRequest, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.username == user_request.username, UserDB.password == user_request.password).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password.")
    user.token = str(uuid4())
    db.commit()
    db.refresh(user)
    return user


@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    if request.url.path.startswith(("/authorization", "/docs", "/openapi.json")) or request.method == 'GET':
        return await call_next(request)
    authorization = request.headers.get("Authorization")
    if not authorization:
        return JSONResponse(content={"detail": "Authorization header missing"}, status_code=401)
    
    parts = authorization.split(" ")
    token = parts[1] if len(parts) > 1 else ""

    db = SessionLocal()
    user = db.query(UserDB).filter(UserDB.token == token).first()
    if not user:
        return JSONResponse(content={"detail": "Invalid or expired token"}, status_code=401)
    response = await call_next(request)
    db.close()
    return response


app.include_router(auth_router)
app.include_router(knives_router)
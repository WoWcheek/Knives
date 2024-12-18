import styled from "styled-components";
import config from "../../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../Global/Header";

const PageContainer = styled.div`
  padding: 2rem;
  background-color: #121824;
  color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const KnifeInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ImagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    object-fit: cover;
  }

  .additional-images {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    img {
      max-width: 150px;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
`;

const InfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoRow = styled.div`
  font-size: 1.2rem;

  span {
    font-weight: bold;
    color: #4caf50;
  }
`;

const KnifePage = () => {
  const { id } = useParams();
  const [knife, setKnife] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKnife = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.backendUrl}/knives/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setKnife(response.data);
      } catch (error) {
        console.error("Не вдалося завантажити деталі ножа:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKnife();
  }, [id]);

  if (loading) {
    return <PageContainer>Завантаження...</PageContainer>;
  }

  if (!knife) {
    return <PageContainer>Інформація про ніж не знайдена</PageContainer>;
  }

  const handleMaterialTranslations = {
    wood: "Дерево",
    plastic: "Пластик",
    metal: "Метал",
    rubber: "Резина",
    carbon_fiber: "Вуглецеве волокно",
  };

  const steelTypeTranslations = {
    stainless_steel: "Нержавіюча сталь",
    damascus: "Дамаск",
    carbon_steel: "Вуглецева сталь",
    titanium: "Титан",
    ceramic: "Кераміка",
  };

  return (
    <PageContainer>
      <Header />
      <Title>{knife.name}</Title>
      <KnifeInfoContainer>
        <ImagesContainer>
          <img
            src={`data:image/png;base64,${knife.images[0]}`}
            alt={`Зображення ножа 1`}
          />
          {knife.images.length > 1 && (
            <div className="additional-images">
              {knife.images.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  src={`data:image/png;base64,${image}`}
                  alt={`Зображення ножа ${index + 2}`}
                />
              ))}
            </div>
          )}
        </ImagesContainer>
        <InfoContainer>
          <InfoRow>
            <span>Ціна:</span> {knife.price} UAH
          </InfoRow>
          <InfoRow>
            <span>Опис:</span> {knife.description}
          </InfoRow>
          <InfoRow>
            <span>Бренд:</span> {knife.brand}
          </InfoRow>
          <InfoRow>
            <span>Довжина леза:</span> {knife.blade_length} см
          </InfoRow>
          <InfoRow>
            <span>Вага:</span> {knife.weight} г
          </InfoRow>
          <InfoRow>
            <span>Матеріал ручки:</span> {handleMaterialTranslations[knife.handle_material] || knife.handle_material}
          </InfoRow>
          <InfoRow>
            <span>Тип сталі:</span> {steelTypeTranslations[knife.steel_type] || knife.steel_type}
          </InfoRow>
        </InfoContainer>
      </KnifeInfoContainer>
    </PageContainer>
  );
};

export default KnifePage;

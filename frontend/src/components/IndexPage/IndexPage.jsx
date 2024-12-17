import config from "../../config";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  PageContainer,
  HeaderContainer,
  Title,
  SearchContainer,
  SearchInput,
  KnivesGrid,
  KnifeCard,
  KnifeImage,
  KnifeTitle,
  KnifePrice,
  Pagination,
  PageButton,
  AuthButton,
  KnifeDescription,
} from "./IndexPage.styled";

const IndexPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [knives, setKnives] = useState([]);
  // const [totalKnives, setTotalKnives] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    const fetchKnives = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${config.backendUrl}/knives?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setKnives(response.data.knives);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch knife data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKnives();
  }, [currentPage, search]); // Trigger when currentPage or search changes

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Магазин ножів</Title>
        <AuthButton>
          {localStorage.getItem("token") ? "Перейти до адмін панелі" : "Увійти"}
        </AuthButton>
      </HeaderContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Пошук ножів"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchContainer>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <KnivesGrid>
          {knives.map((knife) => (
            <KnifeCard key={knife.id}>
              <KnifeImage src={`data:image/png;base64,${knife.images[1]}`} alt={knife.name} />
              <KnifeTitle>{knife.name}</KnifeTitle>
              <KnifePrice>{knife.price} UAH</KnifePrice>
              <KnifeDescription>{knife.description}</KnifeDescription>
            </KnifeCard>
          ))}
        </KnivesGrid>
      )}

      <Pagination>
        <PageButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </PageButton>

        <span style={{ marginTop: "6px" }}>
          {currentPage} / {totalPages}
        </span>

        <PageButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    </PageContainer>
  );
};

export default IndexPage;

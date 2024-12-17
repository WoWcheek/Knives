import {
  Sidebar,
  SidebarNav,
  SidebarLink,
  Main,
  Header,
  AnalyticsSection,
  AnalyticsCard,
  SidebarHeader
} from "./AdminPanelPage.styled";

import KnifeTable from "./Tables/KnifeTable";

import { DealProvider } from "../../core/contexts/DealContext";
import { EditKnifeTableProvider } from "../../core/contexts/EditKnifeTableContext";

const AdminPanelConPage = () => {
  // const { totalClients } = useContext(EditKnifeTableContext);
  // const { totalDeals, totalAmount } = useContext(DealContext);
  const isRegistered = true;
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar>
        <SidebarHeader>Магазин ножів</SidebarHeader>
        <SidebarNav>
            <SidebarLink href="knives">Список ножів</SidebarLink>
            {isRegistered && <SidebarLink href="knives">Адмін панель</SidebarLink>}
            <SidebarLink href="login">Логін</SidebarLink>
        </SidebarNav>
    </Sidebar>

      <Main>
        <Header>
          <h1>Dashboard</h1>
        </Header>

        <AnalyticsSection>
          <h2>Аналітика</h2>
          <div>
            <AnalyticsCard>
              <h3>К-сть ножів</h3>
              <p>0</p>
            </AnalyticsCard>
          </div>
        </AnalyticsSection>
        <KnifeTable/>
      </Main>
    </div>
  );
};

const AdminPanelPage = () => {
  return (
    <EditKnifeTableProvider>
      <DealProvider>
        <AdminPanelConPage/>
      </DealProvider>
    </EditKnifeTableProvider>
  )
}

export default AdminPanelPage;

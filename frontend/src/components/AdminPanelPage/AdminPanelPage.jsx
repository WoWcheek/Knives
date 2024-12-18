import { useContext } from "react";

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

import { EditKnifeTableProvider, EditKnifeTableContext } from "../../core/contexts/EditKnifeTableContext";

const AdminPanelConPage = () => {
  const { totalKnives } = useContext(EditKnifeTableContext);

  if (!localStorage.getItem("token")) {
    return window.location.href = '/'
  }
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar>
        <SidebarHeader>Магазин ножів</SidebarHeader>
        <SidebarNav>
            <SidebarLink href="/">Повернутися на головну</SidebarLink>
            <SidebarLink href="/login">Логін/реєстрація</SidebarLink>
            <SidebarLink onClick={() => {
              localStorage.removeItem("token");
              window.location.reload()
            }}>Вихід з акаунту</SidebarLink>
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
              <p>{totalKnives}</p>
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
    <AdminPanelConPage/>
    </EditKnifeTableProvider>
  )
}

export default AdminPanelPage;

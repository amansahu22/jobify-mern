import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet } from "react-router-dom";
import { Navbar, BigSidebar, SmallSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSidebar />
        <SmallSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
            {/* Outlet will allow us to render nested routs components(profile/stats/...)
      with parent routes component(SharedLayout) */}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;

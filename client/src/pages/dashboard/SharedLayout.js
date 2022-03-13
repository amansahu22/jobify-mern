import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet, Link } from "react-router-dom";

const SharedLayout = () => {
  return (
    <Wrapper>
      SharedLayout Page
      <nav>
        <Link to="add-job">Add Job</Link>
        <Link to="all-jobs">All Jobs</Link>
        <Link to="/">Stats</Link>
      </nav>
      <Outlet />
      {/* Outlet will allow us to render nested routs components(profile/stats/...)
      with parent routes component(SharedLayout) */}
    </Wrapper>
  );
};

export default SharedLayout;

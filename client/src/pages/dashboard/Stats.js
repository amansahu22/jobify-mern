import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, ChartsContainer, Loading } from "../../components";

const Stats = () => {
  const { fetchStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;

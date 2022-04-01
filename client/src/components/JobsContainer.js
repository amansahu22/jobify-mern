import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageButtonContainer from "./PageButtonContainer";

const JobsContainer = () => {
  const {
    getAllJobs,
    jobs,
    totalJobs,
    noOfPages,
    page,
    isLoading,
    search,
    sort,
    searchStatus,
    searchJobType,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, [page, search, sort, searchStatus, searchJobType]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>

      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>

      {noOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

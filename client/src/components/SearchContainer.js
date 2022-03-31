import { FormRow } from "../components";
import { useAppContext } from "../context/appContext";

const SearchContainer = () => {
  const {
    isLoading,
    handleJobInputChange,
    clearSearch,
    search,
    sort,
    searchStatus,
    searchJobType,
    sortOptions,
    statusOptions,
    jobTypeOptions,
  } = useAppContext();

  return <div>SearchContainer</div>;
};

export default SearchContainer;

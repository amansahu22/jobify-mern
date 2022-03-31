import { FormRow } from "../components";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchComponent = () => {
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

  const handleInputChange = (e) => {
    //if we are in the middle of any request then we don't want to allow user to change value(making another request)
    if (isLoading) return;

    const name = e.target.name;
    const value = e.target.value;
    handleJobInputChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearSearch();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>

        <div className="form-center">
          {/* serch by company */}
          <FormRow
            type="text"
            name="search"
            value={search}
            onChange={handleInputChange}
            labelText="search by company"
          />

          {/* searchStatus */}
          <div className="form-row">
            <label className="form-label">status</label>
            <select
              name="searchStatus"
              value={searchStatus}
              onChange={handleInputChange}
              className="form-select"
            >
              {["all", ...statusOptions].map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          {/* searchJobType */}
          <div className="form-row">
            <label className="form-label">job type</label>
            <select
              name="searchJobType"
              value={searchJobType}
              onChange={handleInputChange}
              className="form-select"
            >
              {["all", ...jobTypeOptions].map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          {/* sortOptions */}
          <div className="form-row">
            <label className="form-label">sort</label>
            <select
              name="sort"
              value={sort}
              onChange={handleInputChange}
              className="form-select"
            >
              {sortOptions.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="btn btn-block btn-danger"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchComponent;

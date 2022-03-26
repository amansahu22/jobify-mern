import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const {
    isLoading,
    displayAlert,
    isAlertShown,
    isEditing,
    company,
    position,
    status,
    jobType,
    statusOptions,
    jobTypeOptions,
    jobLocation,
    handleJobInputChange,
    clearJobInputs,
    createJob,
    editJob,
  } = useAppContext();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleJobInputChange(name, value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {isAlertShown && <Alert />}

        {/* position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            onChange={handleInputChange}
          />

          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            onChange={handleInputChange}
          />

          {/* job location */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            onChange={handleInputChange}
            labelText="job location"
          />

          {/* job type */}

          <div className="form-row">
            <label className="form-label">job type</label>
            <select
              name="jobType"
              value={jobType}
              onChange={handleInputChange}
              className="form-select"
            >
              {jobTypeOptions.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          {/*job status */}

          <div className="form-row">
            <label className="form-label">status</label>
            <select
              name="status"
              value={status}
              onChange={handleInputChange}
              className="form-select"
            >
              {statusOptions.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={formSubmitHandler}
              disabled={isLoading}
            >
              {isEditing ? "save changes" : "submit"}
            </button>
            {!isEditing && (
              <button
                className="btn btn-block clear-btn"
                type="clear"
                onClick={(event) => {
                  //at first we have to prevent the default behaviour of form because this button is inside of form so pressing it would cost us refresh of page
                  event.preventDefault();
                  clearJobInputs();
                }}
              >
                clear
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;

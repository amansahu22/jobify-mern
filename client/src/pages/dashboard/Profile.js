import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, displayAlert, isAlertShown, isLoading, updateUser } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={formSubmitHandler}>
        <h3>Profile</h3>
        {isAlertShown && <Alert />}
        <div className="form-center">
          <FormRow
            name="name"
            value={name}
            type="text"
            labelText="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <FormRow
            name="lastName"
            value={lastName}
            type="text"
            labelText="last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <FormRow
            name="email"
            value={email}
            type="email"
            labelText="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <FormRow
            name="location"
            value={location}
            type="text"
            labelText="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;

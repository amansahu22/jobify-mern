import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_JOB_INPUT_CHANGE,
  ClEAR_JOB_INPUT,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
} from "./actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  isAlertShown: false,
  alertText: "",
  alertType: "",
  token: token,
  user: user ? JSON.parse(user) : null,
  userLocation: location || "",
  showSidebar: false,
  company: "",
  position: "",
  status: "pending",
  statusOptions: ["pending", "interview", "decline"],
  jobType: "full-time",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobLocation: location || "",
  isEditing: false,
  editJobid: "",
  jobs: [],
  totalJobs: 0,
  noOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //creating a nstance of axios if we wanr we can set the header here as well but we want to control our resonse status code that's why we can go with axios interceptor
  const authFetch = axios.create({
    baseURL: "/api/v1/",
    // headers:{
    //   Authorization:`Bearer ${state.token}`
    // }
  });

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addDataToLocalStorage = (data) => {
    const { user, token, location } = data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeDataFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });

      addDataToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data,
        },
      });
    }

    clearAlert();
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);

      // console.log(response.data)
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });

      //after updating our state we will save same thing in local storage as well so that on refresh we do not loose data
      addDataToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }

    clearAlert(); //invoking clear alert because we are setting isAlertShown to true in both try and catch block
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeDataFromLocalStorage();
  };

  //request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response interceptor

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);

      if (error.response.status === 401) {
        logoutUser();
      }

      return Promise.reject(error);
    }
  );

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("auth/update-user", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });
      addDataToLocalStorage({ user, token, location });
    } catch (error) {
      //because we have delay in clering alert so if token is expired and we try to do request where token requires in that case it would show 401(unauthorized error) nut in case of 401 we are logging out our user so no need to show alert there otherwise it would stay there for 3 seconds
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const handleJobInputChange = (name, value) => {
    dispatch({ type: HANDLE_JOB_INPUT_CHANGE, payload: { name, value } });
  };

  const clearJobInputs = () => {
    dispatch({ type: ClEAR_JOB_INPUT });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { company, position, jobType, userLocation, status } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobType,
        userLocation,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      clearJobInputs();
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const getAllJobs = async () => {
    let url = `/jobs`;
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const response = await authFetch.get(url);
      const data = response.data;

      const { jobs, totalJobs, noOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          noOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      //logically only 401 and 500 status error could occurs in this case and in those cases we do not want to show alert instead we will directly logout the user
      // logoutUser()
    }
    //we are not showing any alert in this method but if there is some from previous then for precaution we can clear here
    clearAlert();
  };

  const editJobHandler = (id) => {
    alert(id);
  };

  const deleteJobHandler = (id) => {
    alert(id);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleJobInputChange,
        clearJobInputs,
        createJob,
        getAllJobs,
        editJobHandler,
        deleteJobHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//creating custom hook so that in every place i do not need to import and execute useContext hook

const useAppContext = () => {
  return useContext(AppContext);
};

export { initialState, AppContextProvider, useAppContext };

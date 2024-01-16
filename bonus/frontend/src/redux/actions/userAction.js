import { toast } from "react-toastify";
import {
  ALL_USER_LOAD_FAIL,
  ALL_USER_LOAD_REQUEST,
  ALL_USER_LOAD_SUCCESS,
  USER_APPLY_JOB_FAIL,
  USER_APPLY_JOB_REQUEST,
  USER_APPLY_JOB_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstant";
import httpClient from "../../lib/httpClient";

export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await httpClient.post("/api/signin", user);
    localStorage.setItem("userInfo", JSON.stringify(data));
    httpClient.defaults.headers.common["Authorization"] = data?.token;
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    toast.success("Login Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await httpClient.post("/api/signup", user);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    toast.success("Register Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//log out action
export const userLogoutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    localStorage.removeItem("userInfo");
    const { data } = await httpClient.get("/api/logout");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("Log out successfully!");
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//user profile action
export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    const { data } = await httpClient.get("/api/me");
    console.log(data);
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

//all user action
export const allUserAction = () => async (dispatch) => {
  dispatch({ type: ALL_USER_LOAD_REQUEST });
  try {
    const { data } = await httpClient.get("/api/allusers");
    dispatch({
      type: ALL_USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
  dispatch({ type: USER_APPLY_JOB_REQUEST });
  try {
    const { jobId, file } = job;
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("file", file);
    const { data } = await httpClient.post("/api/user/jobhistory", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: USER_APPLY_JOB_SUCCESS,
      payload: data,
    });
    toast.success("Apply Successfully for this Job!");
    return true
  } catch (error) {
    dispatch({
      type: USER_APPLY_JOB_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
    return false
  }
};

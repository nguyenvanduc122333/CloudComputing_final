import axios from "axios";
const httpClient = axios.create({
  baseURL: "http://localhost:9000",
});
const userInfo = localStorage.getItem("userInfo");
const userJSON = JSON.parse(userInfo);
if (userJSON?.token) {
  httpClient.defaults.headers.common["Authorization"] = userJSON.token;
}
export default httpClient;

import axios from "axios";
import { DEBUG } from "config";

axios.defaults.baseURL = DEBUG === true ? `http://localhost:8080/api` : "/api";

export default axios;

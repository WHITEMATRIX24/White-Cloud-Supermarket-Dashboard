import axios from "axios";
import { Headers } from "./headers";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: Headers()
});
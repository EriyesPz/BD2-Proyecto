import axios from "axios";

export const cliente = axios.create({
  baseURL: 'http://localhost:3000',
})
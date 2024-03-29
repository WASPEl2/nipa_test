import axios from "axios";
import { API_HOST } from "../config";

const fetchTickets = async () => {
  try {
    const response = await axios.get(`${API_HOST}/tickets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};

export default fetchTickets;

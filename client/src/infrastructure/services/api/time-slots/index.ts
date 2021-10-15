import axios from "axios";

export default {
  getAllTimeSlots: async () => {
    const response = await axios.get("http://localhost:8080/api/time-slots");

    return response.data;
  },
};

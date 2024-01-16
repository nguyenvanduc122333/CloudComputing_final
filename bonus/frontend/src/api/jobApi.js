import httpClient from "../lib/httpClient";

const jobApi = {
  getSingleJob: async (id) => {
    try {
      const res = await httpClient.get(`/api/job/applicants/${id}`);
      return res.data.applicants;
    } catch (error) {
      return error;
    }
  },
  getHistoryApplicants: async () => {
    try {
      const res = await httpClient.get(`/api/job/history`);
      return res.data.applicants;
    } catch (error) {
      return error;
    }
  }
};

export default jobApi;

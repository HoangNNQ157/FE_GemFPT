import axios from 'axios'

const api = axios.create({
    baseURL: 'https://gemfpt.online/'
  });

  export default api; 
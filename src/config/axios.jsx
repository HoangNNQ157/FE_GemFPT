import axios from 'axios'

const api = axios.create({
    baseURL: 'http://143.198.92.27:8080/'
  });

  export default api; 
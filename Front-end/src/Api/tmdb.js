// configure axios for TMDB API requests
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // get API Key  from .env file for TMDB data fetch 
// Note: Make sure to keep  API key secure and not expose it in public repositories.
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export default tmdb;

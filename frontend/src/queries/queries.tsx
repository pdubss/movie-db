import axios from "axios";

export const getMovies = async () => {
  const res = await axios.get(
    "http://www.omdbapi.com/?i=tt3896198&apikey=ff71c59f"
  );
  return res.data;
};

export const searchMovies = async (query: string) => {
  const res = await axios.get(
    `http://www.omdbapi.com/?s=${query}&apikey=ff71c59f`
  );
  return res.data;
};

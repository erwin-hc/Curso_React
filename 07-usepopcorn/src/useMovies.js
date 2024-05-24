import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        const URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`;

        try {
          setIsloading(true);
          setError("");
          const res = await fetch(URL, { signal: controller.signal });

          if (!res.ok)
            throw new TypeError("Something went wrong with fetching movies!");

          const data = await res.json();

          if (data.Response === "False")
            throw new TypeError("Movie not found!");

          setMovies(data.Search);
        } catch ({ message }) {
          if (message !== "The operation was aborted. ") {
            setError(message);
          }
        } finally {
          setIsloading(false);
        }

        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
      }

      //   handleCloseMovie();

      fetchMovies();

      return () => controller.abort();
    },
    [query],
  );

  return { movies, isLoading, error };
}

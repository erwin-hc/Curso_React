import { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/fc";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const query = "harry";

  useEffect(function () {
    async function fetchMovies() {
      const URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`;

      setIsloading(true);
      const res = await fetch(URL);
      const data = await res.json();
      setMovies(data.Search);
      setIsloading(false);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <p className="loader">Loading...</p>
          ) : (
            <MovieList movies={movies} />
          )}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatcheMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length > 0 ? movies.length : ""}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
      ) : (
        <div
          className="list img"
          style={{
            width: "40px",
            height: "60px",
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "1 / -1",
          }}
        >
          N/A
        </div>
      )}
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>
            <FcCalendar />
          </span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatcheMovieList({ watched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie movie={movie} key={movie.Title} />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

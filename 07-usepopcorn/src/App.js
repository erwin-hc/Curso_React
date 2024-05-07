import { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/fc";

const tempWatchedData = [
  {
    id: "tt1375666",
    title: "Spitfire Over Berlin",
    year: "2022-05-13",
    poster_path: "/xtPPOPTad1qopK6uDe3VlYUa22o.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);

  async function getMovie() {
    const URL = `https://api.themoviedb.org/3/discover/movie?`;
    const API_KEY = `api_key=1787315acea95582c62c2ef4a134b49e`;
    const PAGE = `&page=1`;

    const res = await fetch(`${URL}${API_KEY}${PAGE}`);
    const data = await res.json();
    setMovies(data.results);
  }

  useEffect(() => {
    getMovie();
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
          <MovieList movies={movies} />
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
      Found <strong>{movies.length}</strong> results
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
        <Movie movie={movie} key={movie.title} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <li>
      <img src={imgUrl + movie.poster_path} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>
            <FcCalendar />
          </span>
          <span>{movie.release_date.split("-")[0]}</span>
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
          <WatchedMovie movie={movie} key={movie.title} />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie }) {
  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <li>
      <img src={imgUrl + movie.poster_path} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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

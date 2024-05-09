import { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { TbFaceIdError } from "react-icons/tb";
import { FaLongArrowAltLeft, FaRegStar } from "react-icons/fa";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState("mars");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      async function fetchMovies() {
        const URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`;

        try {
          setIsloading(true);
          setError("");
          const res = await fetch(URL);

          if (!res.ok)
            throw new TypeError("Something went wrong with fetching movies!");

          const data = await res.json();

          if (data.Response === "False")
            throw new TypeError("Movie not found!");

          setMovies(data.Search);
        } catch ({ message }) {
          setError(message);
        } finally {
          setIsloading(false);
        }

        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
      }
      fetchMovies();
    },
    [query],
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onleSelectMovie={handleSelectMovie} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatcheMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Error({ message }) {
  return (
    <p className="error">
      <TbFaceIdError color="#d9534f" size={80} />
      <br />
      {message}
    </p>
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

function Search({ query, setQuery }) {
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

function MovieList({ movies, onleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onleSelectMovie={onleSelectMovie}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onleSelectMovie }) {
  return (
    <li
      style={{ cursor: "pointer" }}
      onClick={() => onleSelectMovie(movie.imdbID)}
    >
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

function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function fetchDetail() {
        const URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`;
        const res = await fetch(URL);
        const data = await res.json();
        setMovie(data);
      }
      fetchDetail();
    },
    [selectedId],
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          <FaLongArrowAltLeft />
        </button>
        <img src={poster} alt={`${title} Poster`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>
              <FaRegStar color={"#f0ad4e"} size={20} />
            </span>
          </p>
        </div>
      </header>
    </div>
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

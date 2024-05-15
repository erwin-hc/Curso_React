import { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { TbFaceIdError } from "react-icons/tb";
import { FaLongArrowAltLeft, FaRegStar } from "react-icons/fa";
import StarRating from "./StarRating.js";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState("star wars");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
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
          console.log(message);

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

      handleCloseMovie();
      fetchMovies();

      return () => controller.abort();
    },
    [query],
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
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
              onAddWached={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatcheMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
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
      <h1>Popcorn</h1>
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
      {movies
        ?.sort((a, b) => a["Title"].localeCompare(b["Title"]))
        ?.map((movie) => (
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

function MovieDetails({ selectedId, onCloseMovie, onAddWached, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState("");

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [onCloseMovie]);

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
    imdbID,
  } = movie;

  useEffect(() => {
    if (!title) return;
    document.title = `${title}`;

    return () => (document.title = "Popcorn");
  }, [title]);

  useEffect(
    function () {
      async function fetchDetail() {
        setIsloading(true);
        const URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`;
        const res = await fetch(URL);
        const data = await res.json();
        setMovie(data);
        setIsloading(false);
      }
      fetchDetail();
    },
    [selectedId],
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(imdbID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === imdbID,
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
    };

    onAddWached(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                  <FaRegStar color={"#f0ad4e"} size={18} />
                </span>
                {imdbRating} - IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color={"#f0ad4e"}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAdd} className="btn-add">
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rated This Movie with :{" "}
                  <span>
                    {watchedUserRating}{" "}
                    <FaRegStar color={"#f0ad4e"} size={12} />
                  </span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Year : {year}</p>
            <p>Starring {actors}</p>
            <p>Directing by {director}</p>
          </section>
        </>
      )}
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatcheMovieList({ watched, onDeleteWatched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      {movie.poster !== "N/A" ? (
        <img src={movie.poster} alt={`${movie.title} poster`} />
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

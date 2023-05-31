import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";
import EditMovieForm from "./components/EditMovieForm";

import { useAxios, REQ_TYPES } from "./hooks/useAxios";
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const { push } = useHistory();
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [getMovies, moviesList, loading, error] = useAxios([]);
  const [deleteMovieM, resDeleteMovie, deleteMovieLoading, deleteMovieError] = useAxios();

  useEffect(() => {
    getMovies({ endpoint: `movies`, reqType: REQ_TYPES.GET }).then((res) => {
      setMovies(res);
    });
  }, []);

  const deleteMovie = (id) => {
    deleteMovieM({ endpoint: `movies/${id}`, reqType: REQ_TYPES.DELETE }).then((res) => {
      getMovies({ endpoint: `movies`, reqType: REQ_TYPES.GET }).then((res) => {
        setMovies(res);
        push(`/movies`);
      });
    });
  };

  const addToFavorites = (movie) => {
    let finder = favoriteMovies.find((mov) => mov.id === movie.id);
    finder !== undefined ? setFavoriteMovies(favoriteMovies.filter((mov) => mov.id !== movie.id)) : setFavoriteMovies([...favoriteMovies, movie]);
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/add/">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} favoriteMovies={favoriteMovies} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;

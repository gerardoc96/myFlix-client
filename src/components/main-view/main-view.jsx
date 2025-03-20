import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Inception",
      Description: "Dom Cobb (Leonardo DiCaprio) is a skilled thief who can enter people's dreams and steal their secrets from their subconscious. His talents have made him a valuable asset in corporate espionage but have also cost him everything he loves. Given a chance at redemption, Cobb and his team must pull off the impossible: planting an idea in someone's mind—a process known as inception. As they navigate the dream world's layers, reality blurs, and Cobb must confront his past before it consumes him.",
      Director: "Christopher Nolan",
      Genre: "Sci-Fi",
      ImagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmaTHAbTa2MTEGM_PwqBU61jEzjEcQfx-Zb39fyctMdZheq2Uj",
    },
    {
      id: 2,
      Title: "Jurassic Park",
      Description: "When billionaire entrepreneur John Hammond (Richard Attenborough) creates a revolutionary theme park featuring cloned dinosaurs, he invites a group of scientists and his grandchildren to tour the facility. However, what begins as a breathtaking wonder quickly turns into a fight for survival when the park's security systems fail, and the prehistoric creatures break loose.",
      Director: "Steven Spielberg",
      Genre: "Thriller",
      ImagePath: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    },
    {
      id: 3,
      Title: "Interstellar",
      Description: "In a near-future Earth plagued by environmental collapse and food shortages, former pilot and engineer Cooper (Matthew McConaughey) is recruited for a daring space mission. Alongside a team of scientists, including Dr. Brand (Anne Hathaway), he travels through a wormhole searching for a habitable planet for humanity's survival. The mission tests their limits as they explore uncharted worlds, forcing Cooper to choose between saving humanity and seeing his children again.",
      Director: "Christopher Nolan",
      Genre: "Sci-Fi",
      ImagePath: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
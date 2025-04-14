import PropTypes from "prop-types";
import { useParams, Link } from "react-router";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import { FavoriteButton } from "../Favorite button/FavoriteButton";
import "../../index.scss";

export const MovieView = ({ user, token, movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const [showGenreDesc, setShowGenreDesc] = useState(false);
  const [showDirectorDetails, setShowDirectorDetails] = useState(false);

  const toggleGenreDesc = () => setShowGenreDesc(!showGenreDesc);
  const toggleDirectorDetails = () => setShowDirectorDetails(!showDirectorDetails);

  return (
    <Card >
      <Card.Body className="text-center">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          alt={movie.Title}
          className="img-primary"
        />
        <Card.Title>Title: {movie.Title}</Card.Title>
        <Card.Text>
          Genre: {""}
          <span
            onClick={toggleGenreDesc}
            style={{ cursor: "pointer", textDecoration: "underline" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleGenreDesc();
            }} >
            {movie.Genre.Name}
          </span>
          {showGenreDesc && (
            <Card.Text className="mt-2">
              <strong>Genre Description:</strong> {movie.Genre.Description}
            </Card.Text>
          )}
        </Card.Text>
        <Card.Text>
          Director: {""}
          <span
            onClick={toggleDirectorDetails}
            style={{ cursor: "pointer", textDecoration: "underline" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleDirectorDetails();
            }} >
            {movie.Director.Name}
          </span>
          {showDirectorDetails && (
            <Card.Text className="mt-2">
              <strong>Director Bio:</strong> {movie.Director.Bio}
              <br />
              <strong>Birth:</strong> {movie.Director.Birth}
              {movie.Director.Death && (
                <>
                  <br />
                  <strong>Death:</strong> {movie.Director.Death}
                </>
              )}
            </Card.Text>
          )}
        </Card.Text>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Link to={`/`}>
          <Button className="btn-primary">Back</Button>
        </Link>
        <FavoriteButton
          movieId={movie._id}
          user={user}
          token={token}
          onFavoriteToggle={onFavoriteToggle} />
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
      }).isRequired,
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "../../index.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => { onMovieClick(movie) }} style={{ cursor: "pointer" }} >
      <Card.Img className="img-primary" variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieCard: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
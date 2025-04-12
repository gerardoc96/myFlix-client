import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import "../../index.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} className="img-primary" />
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="btn-primary">Read More</Button>
        </Link>
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
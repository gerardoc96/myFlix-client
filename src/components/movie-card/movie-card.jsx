import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import { FavoriteButton } from "../Favorite button/FavoriteButton";
import "../../index.scss";

export const MovieCard = ({ movie, user, token, onFavoriteToggle }) => {
  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          alt={movie.Title}
          className="img-primary"
        />
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="btn-primary">Read More</Button>
        </Link>
        <FavoriteButton
          movieId={movie._id}
          user={user}
          token={token}
          onFavoriteToggle={onFavoriteToggle} />
      </Card.Body>
    </Card >
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
  token: PropTypes.string,
  onFavoriteToggle: PropTypes.func.isRequired,
};
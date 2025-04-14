import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const FavoriteButton = ({ movieId, user, token, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(
    user?.FavoriteMovies?.includes(movieId) || false
  );

  const handleToggle = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    try {
      const method = newFavoriteStatus ? "POST" : "DELETE";
      const response = await fetch(
        `https://my-flix1-a5a1dc031ab1.herokuapp.com/users/${user.Username}/${movieId}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${newFavoriteStatus ? "add" : "remove"} favorite`
        );
      }


      onFavoriteToggle(movieId, newFavoriteStatus);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite(!newFavoriteStatus);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Button
      variant={isFavorite ? "danger" : "success"}
      onClick={handleToggle}
      className="btn-favorite"
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
};

FavoriteButton.propTypes = {
  movieId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  token: PropTypes.string.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
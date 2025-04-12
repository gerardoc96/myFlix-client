import PropTypes from "prop-types";
import { useParams, Link } from "react-router";
import { Button, Card } from "react-bootstrap";
import "../../index.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <Card >
      <Card.Body className="text-center">
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} className="img-primary" />
        <Card.Title>Title: {movie.Title}</Card.Title>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Link to={`/`}>
          <Button className="btn-primary">Back</Button>
        </Link>
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
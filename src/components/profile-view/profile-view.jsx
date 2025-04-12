import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from "react-router";

export function ProfileView({ user, onLoggedOut }) {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.Username) {
        setError('User information is missing');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://my-flix1-a5a1dc031ab1.herokuapp.com/users/${user.Username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setFavorites(data.favorites || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card style={{ maxWidth: '600px' }} className="mx-auto">
        <Card.Header as="h2" className="text-center">
          User Profile
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Username:</strong> {userData?.Username}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {userData?.Email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Password:</strong> ••••••••{' '}
              <Button variant="link" size="sm">
                Change Password
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Birthday:</strong>{' '}
              {userData?.Birthday
                ? new Date(user.Birthday).toLocaleDateString()
                : 'Not set'}
            </ListGroup.Item>
          </ListGroup>

          <Card.Title className="mt-4">Favorites</Card.Title>
          {favorites.length > 0 ? (
            <ListGroup>
              {favorites.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item.name || item} {/* Adjust based on your favorites data structure */}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Card.Text className="text-muted">
              No favorites added yet.
            </Card.Text>
          )}
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary" className="me-2">
            Edit Profile
          </Button>
          <Button variant="outline-secondary">Add Favorite</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
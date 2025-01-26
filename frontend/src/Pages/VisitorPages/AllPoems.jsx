import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const AllPoem = () => {
  const [poems, setPoems] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchPoems = async () => {
      const res = await axios.get('https://poet-poetry-backend-1.onrender.com/poet/allpoems', {
        withCredentials: true,
      });
      setPoems(res.data.poems);
    };
    const fetchUsers = async () => {
      const res = await axios.get('https://poet-poetry-backend-1.onrender.com/poet/allusers', {
        withCredentials: true,
      });
      setUsers(res.data.users);
    };
    const fetchLikes = async () => {
      const res = await axios.get('https://poet-poetry-backend-1.onrender.com/visitor/likes', {
        withCredentials: true,
      });
      setLikes(res.data.likes);
    };
    fetchPoems();
    fetchUsers();
    fetchLikes();
  }, []);

  const filteredPoems = poems.filter(
    (poem) => selectedUser === 'all' || poem.poet.toString() === selectedUser
  );

  const handleLike = async (poemId) => {
    try {
      const res = await axios.post(
        'https://poet-poetry-backend-1.onrender.com/visitor/like',
        { poemId },
        {
          withCredentials: true,
        }
      );
      message.success(res.data.message)
      setLikes((prevLikes) => ({
        ...prevLikes,
        [poemId]: res.data.like,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <h4>Filter by User</h4>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="all">All</option>
            {users.map((user) => (
              <option value={user._id}>{user.name}</option>
            ))}
          </select>
        </Col>
        <Col md={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredPoems.map((poem) => (
              <Col key={poem._id}>
                <Card>
                  <Card.Img variant="top" src={poem.poster} />
                  <Card.Body>
                    <Card.Title>{poem.title}</Card.Title>
                    <Card.Text>{poem.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleLike(poem._id)}
                    >
                      {likes[poem._id] ? 'Unlike' : 'Like'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AllPoem;

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyPoems = () => {
  const [poems, setPoems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPoems = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/poet/myPoetry`, {
        withCredentials: true,
      });
      setPoems(res.data.poems);
    };
    fetchPoems();
  }, []);
  return (
    <Container className="mt-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {poems.map((poem) => (
          <Col key={poem._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={poem.poster} style={{height:'200px'}}/>
              <Card.Body>
                <Card.Title>{poem.title}</Card.Title>
                <Card.Text>{poem.description}</Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyPoems;


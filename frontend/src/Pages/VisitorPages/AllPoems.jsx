import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { message, Modal } from 'antd';
import { TextField } from '@mui/material';
import { Rating } from '@mui/material';

const AllPoem = () => {
  const [poems, setPoems] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');
  const [count,setCount]= useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [poemId, setPoemId] = useState('');

  useEffect(() => {
    const fetchPoems = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/poet/allpoems`, {
        withCredentials: true,
      });
      setPoems(res.data.poems);
    };
    const fetchUsers = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/poet/allusers`, {
        withCredentials: true,
      });
      setUsers(res.data.users);
    };
    const fetchLikes = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/visitor/likes`, {
        withCredentials: true,
      });
      setLikes(res.data.likes);
    };
    fetchPoems();
    fetchUsers();
    fetchLikes();
  }, [count]);

  const filteredPoems = poems.filter(
    (poem) => selectedUser === 'all' || poem.poet.toString() === selectedUser
  );

  const handleLike = async (poemId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/visitor/like`,
        { poemId },
        {
          withCredentials: true,
        }
      );
      if(res.status==200){
        message.success(res.data.message)
      }
      if(res.status==201)
      {
        message.warning(res.data.message)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/visitor/givereview`,
        { poemId, rating, review },
        {
          withCredentials: true,
        }
      );
      if(res.status==200){
        message.success(res.data.message)
      }
      if(res.status==201)
      {
        message.warning(res.data.message)
      }
      setReview('')
      setRating(0)
      setPoemId('')
      
      
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
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
                      onClick={() => {handleLike(poem._id),setCount(count+1),setCount(count+1)}}
                    >
                      {poem.likes.some((key) => key === localStorage.getItem('visitorId')) ? 'Unlike' : 'Like'} 
                    </Button>

                    <Button
                      variant="secondary"
                      style={{marginLeft:"10px"}}
                      onClick={()=>{showModal(),setPoemId(poem._id)}}
                    >
                      Give Review & Rating 
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Modal title="Give Review & Rating" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <p>Rating:</p>
          <Rating
            style={{fontSize:"3.5rem"}}
            name="simple-controlled"
            value={rating}
            onChange={handleRatingChange}
            precision={1}
            max={5}
            icon={<span className="star-icon">&#x2605;</span>}
            emptyIcon={<span className="star-icon">&#x2605;</span>}
          />
        </div>
        <div>
          <p>Review:</p>
          <TextField
            value={review}
            onChange={handleReviewChange}
            label="Type your review here"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        </div>
      </Modal>
    </Container>
  );
};

export default AllPoem;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Card, Button, Container } from 'react-bootstrap'

const LikedPoems = () => {
  const [poems, setPoems] = useState([])
  const [likes, setLikes] = useState({})

  useEffect(() => {
   
    const fetchPoems = async () => {
      const res = await axios.get('https://poet-poetry-backend-1.onrender.com/visitor/likedpoems', {
        withCredentials: true,
      })
      setPoems(res.data)
    console.log(res.data)
    }
    fetchPoems()
  }, [])

  return (
    <div>
      <Container>
      <h1>Liked Poems</h1>

      <Row>
      {poems.map((poem) => (
              <Col key={poem._id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={poem.poster} style={{height:'200px'}} />
                  <Card.Body>
                    <Card.Title>{poem.title}</Card.Title>
                    <Card.Text>{poem.description}</Card.Text>                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
        
      </Row>    
      </Container>
     



    </div>
  )
}

export default LikedPoems
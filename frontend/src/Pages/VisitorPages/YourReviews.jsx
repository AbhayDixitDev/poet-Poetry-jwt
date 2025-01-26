import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'
import { CircularProgress, Typography, Rating } from '@mui/material'

const YourReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/visitor/myreviews`, {
          withCredentials: true,
        })
        setReviews(res.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchReviews()
  }, [])

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your Reviews
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Poem Title</th>
              <th>Poster</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{review.poem.title}</td>
                <td><img src={review.poem.poster} style={{maxWidth:"100px",maxHeight:"100px"}}  alt="" /></td>
                <td style={{whiteSpace:"pre-wrap"}}>{review.poem.description}</td>
                <td>
                  <Rating value={review.rating} readOnly />
                </td>
                <td>{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default YourReviews

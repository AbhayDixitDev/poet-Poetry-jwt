import React, { useState } from 'react'
import { Container, Grid, Box, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {message} from "antd"

const AddPoem = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [poster, setPoster] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('poster', poster)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/poet/addpoem`, formData, {
        withCredentials: true
      })
      console.log(res)
      message.success(res.data.message)
      setTitle('')
      setDescription('')
      setPoster(null)

      navigate('/poet')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Add Poem
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                variant="outlined"
                margin="normal"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="Poster">Poster</label>
              <TextField
                type="file"
                // label="Poster"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setPoster(e.target.files[0])}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddPoem
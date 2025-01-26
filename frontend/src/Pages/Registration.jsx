import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { TextField, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {message} from 'antd'
import axios from 'axios'
const Registration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('poet')

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('poetName')) {
      navigate('/poet')
    }
  },[])

  const handleSubmit = async (e) => {
    console.log(type);
    
    e.preventDefault()
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('avatar', avatar)
      formData.append('type', type)

      let api = `${import.meta.env.VITE_API_URL}/${type}/register`
      let res = await axios.post(api, formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      console.log(res)
      message.success(res.data.message)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="4">
          <Form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h1 className="mb-4 text-center">Registration</h1>
            <Form.Group controlId="type" className="mb-3">
              <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '350px' }}>
                <option value="poet">Poet</option>
                <option value="visitor">Visitor</option>
              </select>
            </Form.Group>
            <Form.Group controlId="name" className="mb-3">
              <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="outlined"
                style={{ width: '350px' }}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                style={{ width: '350px' }}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                style={{ width: '350px' }}
              />
            </Form.Group>
            <Form.Group controlId="avatar" className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"                
                style={{ width: '350px' }}
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading} style={{ width: '350px', margin: '0 0', display: 'block' }}>
              {loading ? <CircularProgress size={20} /> : 'Register'}
            </Button>
            <Button variant="secondary" type="button" style={{ width: '350px', margin: '10px 0', display: 'block' }} onClick={() => navigate('/')}>
                Have an account? Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Registration
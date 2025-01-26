import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { TextField, CircularProgress, Link } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import axios from 'axios' 
import {message } from 'antd'
import {useEffect} from 'react'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('poet')


  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem(`${type}Name`)) {
      navigate(`/${type}`)
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let api = `https://poet-poetry-backend-1.onrender.com/${type}/login`
      let response = await axios.post(api,{email,password},{withCredentials:true})
      setLoading(false)
      localStorage.setItem(`${type}Name`,response.data.name)
      localStorage.setItem(`${type}Avatar`,response.data.avatar)
      message.success(response.data.message)
      navigate(`/${type}`)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }



  return (
      <Container >
        <Row className="justify-content-center">
          <Col md={4}>
            <Form onSubmit={handleSubmit} className="text-center">
              <h1 className="mb-4">Login</h1>
              <Form.Group controlId="type" className="mb-3">
              <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '350px' }}>
                <option value="poet">Poet</option>
                <option value="visitor">Visitor</option>
              </select>
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
              <Button
                type="submit"
                variant="primary"
                block
                disabled={loading}
                className="mb-4"
                style={{ width: '350px' }}
              >
                {loading ? <CircularProgress size={15} /> : 'Login'}
              </Button>
              <Button variant="secondary" type="button" style={{ width: '350px' }} onClick={() => navigate('/register')} >
                  Don't have an account? Sign up
                </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}

export default Login

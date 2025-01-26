import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { TextField, CircularProgress, Link } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d6efd',
    },
    secondary: {
      main: '#6c757d',
    },
  },
})

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Call your login API here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.success) {
        // Redirect to dashboard or whatever
        window.location.href = '/dashboard'
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        fluid
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Row className="justify-content-center">
          <Col md={4}>
            <Form onSubmit={handleSubmit} className="text-center">
              <h1 className="mb-4">Login</h1>
              <Form.Group controlId="email" className="mb-3">
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ width: '300px' }}
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
                  style={{ width: '300px' }}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                block
                disabled={loading}
                className="mb-4"
                style={{ width: '300px' }}
              >
                {loading ? <CircularProgress size={20} /> : 'Login'}
              </Button>
              <Link href="/signup" underline="none" style={{textDecoration:"none",display:"inline"}}>
                <Button variant="primary" block style={{ width: '300px' }}>
                  Don't have an account? Sign up
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default Login

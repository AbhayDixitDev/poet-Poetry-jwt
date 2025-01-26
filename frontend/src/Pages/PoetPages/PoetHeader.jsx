import React from 'react'
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'


const PoetHeader = () => {
  const navigate = useNavigate()
  const logoutPoet = async() => {
    try {
      
      const res = await axios.get('https://poet-poetry-backend-1.onrender.com/poet/logout', {withCredentials:true})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem('poetName')
    localStorage.removeItem('poetAvatar')

    navigate('/')
  }




  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/poet">Poet's Poetry</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className='me-auto' style={{color:"#888"}}>
          <Nav.Link as={Link} href="/poet">
          Welcome Back, {localStorage.getItem('poetName')}
          <img src={localStorage.getItem('poetAvatar')} alt="User  Avatar" height={40} width={40} style={{borderRadius: '50%', border:'1px solid #888'}}/>
          </Nav.Link>                    
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
        
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/poet/addpoem">Create Poetry</Nav.Link>
            <Nav.Link as={Link} to="/poet/myPoetry">My Poetry</Nav.Link>
            <Nav.Link as={Link} to="/poet/allPoetry">All Poetry</Nav.Link>
            <Button variant="outline-light" onClick={() => {logoutPoet()}}>
              Logout
            </Button>
          </Nav>
          
          
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  )
}

export default PoetHeader
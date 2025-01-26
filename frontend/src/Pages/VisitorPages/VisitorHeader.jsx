import React from 'react'
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'


const VisitorHeader = () => {
  const navigate = useNavigate()
  const logoutVisitor = async() => {
    try {
      
      const res = await axios.get('https://poet-poetry-backend-1.onrender.com/Visitor/logout', {withCredentials:true})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem('visitorName')
    localStorage.removeItem('visitorAvatar')

    navigate('/')
  }




  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/visitor">Poet's Poetry</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className='me-auto' style={{color:"#888"}}>
          <Nav.Link as={Link} href="/Visitor">
          Welcome Back, {localStorage.getItem('visitorName')}
          <img src={localStorage.getItem('visitorAvatar')} alt="User  Avatar" height={40} width={40} style={{borderRadius: '50%', border:'1px solid #888'}}/>
          </Nav.Link>                    
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
        
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/visitor/allPoetry">All Poetry</Nav.Link>
            <Nav.Link as={Link} to="/visitor/likedPoetry">My Liked Poetry</Nav.Link>
            <Button variant="outline-light" onClick={() => {logoutVisitor()}}>
              Logout
            </Button>
          </Nav>
          
          
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  )
}

export default VisitorHeader
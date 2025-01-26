import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Header = () => {
  return (
    <Container fluid bg="dark" style={{backgroundColor:"#888"}}>
      <Row className="justify-content-center">
        <Col md="auto">
          <div className="text-center  fs-1" >Welcome to Poet's Poetry</div>
        </Col>
      </Row>
    </Container>
  )
}

export default Header
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <Container fluid style={{backgroundColor:"#888"}}>
    <Row className="justify-content-center">
      <Col md="auto">
        <div className="text-center" style={{ fontSize: '1.5rem' }} >
            Copyright © {new Date().getFullYear()} Poet's Poetry. All rights reserved.
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default Footer
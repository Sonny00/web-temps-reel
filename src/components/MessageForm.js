import React  from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import "./MessageForm.css"; 


function Messageform() {
    function handleSubmit(e) {
        e.preventDefault();
    }
    
    return (
        <>
        <div className="messages-output"></div>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Ton Message..."></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button type="submit" variant="primary" style={{width:'100%', backgroundColor:'grey'}}>Send</Button>
                        <i className="fas fa-paper-plane"></i> 
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Messageform; 
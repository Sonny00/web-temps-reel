import React from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';
import Navigation from '../components/Navigation';


function Chat() {
    <Navigation />

    return (


        <Container>
            <Row>
            <Navigation />

                <Col md={4}>
                    <SideBar />
                </Col>
                <Col md={8}>
                    <MessageForm />
                </Col>
            </Row>
        </Container>
    );

}

export default Chat; 

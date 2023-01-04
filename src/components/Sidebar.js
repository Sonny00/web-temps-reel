import React  from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";


function Sidebar() {
   const room = ["Salle 1", "Salle 2" , "Salle 3"];
    return (
        <>

            <h2>Salle Disponible</h2>   
            <ListGroup>
                {room.map((room,idx) => (
                    <ListGroup.Item key={idx}>{room}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );

}

export default Sidebar; 
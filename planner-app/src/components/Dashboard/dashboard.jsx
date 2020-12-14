import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class Dashboard extends Component {
    render() { 
        return (  
            <Card className="mx-auto my-2" style={{ width: '30rem', margin: '0 auto', padding:'10px'}}>
                <Card.Img variant="top" src={"dashboard.jpg"} />
                <Card.Body>
                    <Card.Title>Study Planner</Card.Title>
                    <Card.Text>
                        Better solution to take notes and help you study!
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
 
export default Dashboard;
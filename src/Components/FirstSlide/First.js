import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom"; 
import img from '../FirstSlide/trafalgar-header illustration 1.png';
import '../Css/first.css';
import ExampleComponent from './typeanimation';

function FirstLayout() {
  const navigate = useNavigate();

  const handleQuestionnaireClick = () => {
    navigate('/questionnaire');
  };

  return (
    <Container style={{padding: '20px'}}>
      <Row>
        <Col>
          <div className='first'>
            Virtual Mental healthcare
          </div>
          <ExampleComponent/> 
          <div className='bton'>
            <button className='third align-items-center justify-content-center d-flex gap-1' onClick={handleQuestionnaireClick}>
              Questionnaire<ion-icon name="newspaper"></ion-icon>
            </button>
          </div> 
        </Col>
        <Col>
          <img src={img} className="App-logo" alt="logo" style={{
            width: '693px',
            height: '598px'
          }} />
        </Col>
      </Row>
    </Container>
  );
}

export default FirstLayout;

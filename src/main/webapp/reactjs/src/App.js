import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate }
  from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

// Imports des composants
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Login from './components/Login';
import OAuth2Callback from './components/OAuth2Callback';
import Bienvenue from './components/Bienvenue';
import Voiture from './components/Voiture';
import VoitureListe from './components/VoitureListe';
import PrivateRoute from './components/PrivateRoute';
import ChatIA from './components/ChatIA';

function App() {
  const marginTop = { marginTop: "20px" };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              {/* Redirection / vers /login */}
              <Route path='/'
                element={<Navigate to="/login" replace />} />

              {/* Routes publiques */}
              <Route path='/login' element={<Login />} />
              <Route path='/oauth2/callback'
                element={<OAuth2Callback />} />

              {/* Routes protégées */}
              <Route path='/home'
                element={<PrivateRoute element={<Bienvenue />} />} />
              <Route path='/add'
                element={<PrivateRoute element={<Voiture />} />} />
              <Route path='/edit/:id'
                element={<PrivateRoute element={<Voiture />} />} />
              <Route path='/list'
                element={<PrivateRoute element={<VoitureListe />} />} />
              <Route path='/chat'
                element={<PrivateRoute element={<ChatIA />} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
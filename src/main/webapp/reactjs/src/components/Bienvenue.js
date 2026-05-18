import React from 'react';
import { Container } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    return (
      <Container className="mt-4">
        <div className="p-5 mb-4 bg-dark text-white rounded-3">
          <h1>Bienvenue au Magasin des Voitures</h1>
          <blockquote className="blockquote mb-0">
            <p>Le meilleur de nos voitures est exposé près de chez vous</p>
            <footer className="blockquote-footer text-muted">Master MIOLA</footer>
          </blockquote>
        </div>
      </Container>
    );
  }
}

export default Bienvenue;
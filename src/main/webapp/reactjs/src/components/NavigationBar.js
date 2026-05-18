import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg"
            width="30"
            height="30"
            alt="logo"
          />
        </Link>
        <Nav className="mr-auto">
          <Link to="/add" className="nav-link">Ajouter une Voiture</Link>
          <Link to="/list" className="nav-link">Liste des Voitures</Link>
        </Nav>
        <Link to={"chat"} className="nav-link">
            <FontAwesomeIcon icon={faRobot} className="me-1" />
            Assistant IA
        </Link>

      </Navbar>
    );
  }
}
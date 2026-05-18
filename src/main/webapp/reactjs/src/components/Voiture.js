import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import axios from '../axiosConfig';
import MyToast from './myToast';

export default class Voiture extends Component {

  initialState = {
    id: '',
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    prix: '',
    annee: '',
    show: false
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount() {
    const voitureId = this.props.match?.params?.id;
    if (voitureId) {
      axios.get("http://localhost:8081/voitures/" + voitureId)
        .then(response => {
          this.setState(response.data);
        });
    }
  }

  resetVoiture = () => {
    this.setState(this.initialState);
  };

  voitureChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitVoiture = event => {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      prix: this.state.prix,
      annee: this.state.annee
    };

    const voitureId = this.props.match?.params?.id;

    if (voitureId) {
      axios.put("http://localhost:8081/voitures/" + voitureId, voiture)
        .then(response => {
          if (response.data) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        });
    } else {
      axios.post("http://localhost:8081/voitures", voiture)
        .then(response => {
          if (response.data) {
            this.setState({ ...this.initialState, show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        });
    }
  };

  render() {
    const { marque, modele, couleur, immatricule, prix, annee } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast children={{ show: this.state.show, message: "Voiture enregistrée avec succès.", type: "success" }} />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> {this.state.id ? "Modifier Voiture" : "Ajouter une Voiture"}
          </Card.Header>

          <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture}>
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control required value={marque} name="marque" type="text"
                    className="bg-dark text-white" onChange={this.voitureChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control required value={modele} name="modele" type="text"
                    className="bg-dark text-white" onChange={this.voitureChange} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control required value={couleur} name="couleur" type="text"
                    className="bg-dark text-white" onChange={this.voitureChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control required value={immatricule} name="immatricule" type="text"
                    className="bg-dark text-white" onChange={this.voitureChange} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control required value={prix} name="prix" type="number"
                    className="bg-dark text-white" onChange={this.voitureChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Année</Form.Label>
                  <Form.Control required value={annee} name="annee" type="number"
                    className="bg-dark text-white" onChange={this.voitureChange} />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Enregistrer
              </Button>{' '}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
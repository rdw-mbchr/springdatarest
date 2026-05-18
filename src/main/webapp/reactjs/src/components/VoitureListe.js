import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faRobot, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import MyToast from './myToast';

export default class VoitureListe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false,
      description: '',
      descShow: false,
      descLoading: false,
      descVoitureId: null
    };
  }

  componentDidMount() {
    this.getVoitures();
  }

  getVoitures = () => {
    axios.get("http://localhost:8081/voitures")
      .then(response => this.setState({ voitures: response.data }));
  };

  deleteVoiture = (voitureId) => {
    axios.delete("http://localhost:8081/voitures/" + voitureId)
      .then(response => {
        if (response.data) {
          this.setState({
            show: true,
            voitures: this.state.voitures.filter(v => v.id !== voitureId)
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      });
  };

  getDescription = (voitureId) => {
    this.setState({ descLoading: true, descShow: false, descVoitureId: voitureId });
    axios.get("http://localhost:8081/ai/description/" + voitureId)
      .then(response => {
        this.setState({
          description: response.data.description,
          descShow: true,
          descLoading: false
        });
      })
      .catch(() => {
        this.setState({
          description: "Erreur lors de la génération de la description.",
          descShow: true,
          descLoading: false
        });
      });
  };

  render() {
    return (
      <div>

        {/* Toast suppression */}
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast children={{
            show: this.state.show,
            message: "Voiture supprimée avec succès.",
            type: "danger"
          }} />
        </div>

        {/* Description IA */}
        {this.state.descShow && (
          <Alert
            variant="info"
            onClose={() => this.setState({ descShow: false })}
            dismissible
            className="mt-2"
          >
            <Alert.Heading>
              <FontAwesomeIcon icon={faRobot} className="me-2" />
              Description générée par IA
            </Alert.Heading>
            <p className="mb-0">{this.state.description}</p>
          </Alert>
        )}

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Liste des Voitures</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ?
                  <tr>
                    <td colSpan="7" align="center">
                      Aucune Voiture disponible
                    </td>
                  </tr> :
                  this.state.voitures.map(voiture => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>

                          {/* Bouton Modifier */}
                          <Link
                            to={`/edit/${voiture.id}`}
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Modifier">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>

                          {/* Bouton Supprimer */}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="me-1"
                            title="Supprimer"
                            onClick={() => this.deleteVoiture(voiture.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>

                          {/* Bouton Description IA */}
                          <Button
                            size="sm"
                            variant="outline-info"
                            title="Description IA"
                            disabled={this.state.descLoading &&
                              this.state.descVoitureId === voiture.id}
                            onClick={() => this.getDescription(voiture.id)}>
                            {this.state.descLoading &&
                            this.state.descVoitureId === voiture.id ?
                              <FontAwesomeIcon icon={faSpinner} spin /> :
                              <FontAwesomeIcon icon={faRobot} />
                            }
                          </Button>

                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
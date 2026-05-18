import React, { Component } from 'react';
import { Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import axios from '../axiosConfig';

export default class Login extends Component {

  state = {
    // Login
    loginUsername: '',
    loginPassword: '',
    loginError: '',
    // Register
    regUsername: '',
    regPassword: '',
    regEmail: '',
    regError: '',
    regSuccess: ''
  };

  handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        username: this.state.loginUsername,
        password: this.state.loginPassword
      });
      localStorage.setItem('token', response.data);
      window.location.href = '/list';
    } catch (err) {
      this.setState({
        loginError: 'Identifiants incorrects'
      });
    }
  };

  handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', {
        username: this.state.regUsername,
        password: this.state.regPassword,
        email: this.state.regEmail
      });
      this.setState({
        regSuccess: 'Compte créé ! Connectez-vous.',
        regError: ''
      });
    } catch (err) {
      this.setState({
        regError: 'Erreur : ' + (err.response?.data || err.message)
      });
    }
  };

  handleGoogleLogin = () => {
    window.location.href =
      'http://localhost:8081/oauth2/authorization/google';
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="card bg-dark text-white p-4"
             style={{ maxWidth: '500px', margin: 'auto' }}>

          <h2 className="text-center mb-4 text-info">
            🚗 Magasin de Voitures
          </h2>

          <Tabs defaultActiveKey="login" className="mb-3">

            {/* ===== ONGLET LOGIN ===== */}
            <Tab eventKey="login" title="Se connecter">
              {this.state.loginError &&
                <div className="alert alert-danger">
                  {this.state.loginError}
                </div>
              }
              <Form onSubmit={this.handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="bg-dark text-white"
                    placeholder="Votre username"
                    value={this.state.loginUsername}
                    onChange={e =>
                      this.setState({ loginUsername: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    className="bg-dark text-white"
                    placeholder="Votre mot de passe"
                    value={this.state.loginPassword}
                    onChange={e =>
                      this.setState({ loginPassword: e.target.value })}
                  />
                </Form.Group>
                <Button className="w-100 mb-2"
                        variant="success" type="submit">
                  Se connecter
                </Button>
              </Form>
              <hr className="border-secondary" />
              <Button className="w-100" variant="danger"
                      onClick={this.handleGoogleLogin}>
                Se connecter avec Google
              </Button>
            </Tab>

            {/* ===== ONGLET REGISTER ===== */}
            <Tab eventKey="register" title="S'inscrire">
              {this.state.regError &&
                <div className="alert alert-danger">
                  {this.state.regError}
                </div>
              }
              {this.state.regSuccess &&
                <div className="alert alert-success">
                  {this.state.regSuccess}
                </div>
              }
              <Form onSubmit={this.handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="bg-dark text-white"
                    placeholder="Choisir un username"
                    value={this.state.regUsername}
                    onChange={e =>
                      this.setState({ regUsername: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="bg-dark text-white"
                    placeholder="Votre email"
                    value={this.state.regEmail}
                    onChange={e =>
                      this.setState({ regEmail: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    className="bg-dark text-white"
                    placeholder="Choisir un mot de passe"
                    value={this.state.regPassword}
                    onChange={e =>
                      this.setState({ regPassword: e.target.value })}
                  />
                </Form.Group>
                <Button className="w-100"
                        variant="primary" type="submit">
                  Créer mon compte
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
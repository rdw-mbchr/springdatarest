import React, { Component } from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import axios from '../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser,
         faCar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

export default class ChatIA extends Component {

  state = {
    messages: [
      { role: 'assistant',
        text: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider à choisir votre voiture ?' }
    ],
    input: '',
    budget: '',
    loading: false,
    activeTab: 'chat'
  };

  sendMessage = async () => {
    if (!this.state.input.trim()) return;

    const userMsg = this.state.input;
    this.setState(prev => ({
      messages: [...prev.messages,
        { role: 'user', text: userMsg }],
      input: '',
      loading: true
    }));

    try {
      const response = await axios.post('/ai/chat',
        { message: userMsg });
      this.setState(prev => ({
        messages: [...prev.messages,
          { role: 'assistant',
            text: response.data.response }],
        loading: false
      }));
    } catch (err) {
      this.setState(prev => ({
        messages: [...prev.messages,
          { role: 'assistant',
            text: 'Erreur de connexion avec l\'IA.' }],
        loading: false
      }));
    }
  };

  getRecommendation = async () => {
    if (!this.state.budget) return;
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `/ai/recommend/${this.state.budget}`);
      this.setState(prev => ({
        messages: [...prev.messages,
          { role: 'user',
            text: `Budget : ${this.state.budget} MAD` },
          { role: 'assistant',
            text: response.data.recommendation }],
        loading: false
      }));
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faRobot} className="me-2" />
          Assistant IA — Conseiller Voitures
          <Badge bg="success" className="ms-2">Mistral AI</Badge>
        </Card.Header>

        <Card.Body>
          {/* Zone des messages */}
          <div style={{ height: '400px', overflowY: 'auto',
                        padding: '10px', backgroundColor: '#1e1e1e',
                        borderRadius: '8px', marginBottom: '15px' }}>
            {this.state.messages.map((msg, i) => (
              <div key={i} style={{
                textAlign: msg.role === 'user' ? 'right' : 'left',
                marginBottom: '10px'
              }}>
                <span style={{
                  display: 'inline-block',
                  maxWidth: '75%',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  backgroundColor: msg.role === 'user'
                    ? '#1F5C99' : '#2d2d2d',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  {msg.role === 'assistant' &&
                    <FontAwesomeIcon icon={faRobot}
                      className="me-2" style={{ color: '#61DAFB' }} />
                  }
                  {msg.text}
                  {msg.role === 'user' &&
                    <FontAwesomeIcon icon={faUser}
                      className="ms-2" />
                  }
                </span>
              </div>
            ))}
            {this.state.loading &&
              <div style={{ color: '#6DB33F' }}>
                <FontAwesomeIcon icon={faRobot} className="me-2" />
                L'IA réfléchit...
              </div>
            }
          </div>

          {/* Input chatbot */}
          <div className="d-flex mb-3">
            <Form.Control
              className="bg-dark text-white me-2"
              placeholder="Posez votre question sur les voitures..."
              value={this.state.input}
              onChange={e =>
                this.setState({ input: e.target.value })}
              onKeyPress={e =>
                e.key === 'Enter' && this.sendMessage()}
            />
            <Button variant="primary"
                    onClick={this.sendMessage}
                    disabled={this.state.loading}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>

          {/* Recommandation par budget */}
          <Card className="bg-secondary">
            <Card.Body>
              <h6>
                <FontAwesomeIcon icon={faMoneyBill}
                  className="me-2" />
                Recommandation par budget
              </h6>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  className="bg-dark text-white me-2"
                  placeholder="Votre budget en MAD"
                  value={this.state.budget}
                  onChange={e =>
                    this.setState({ budget: e.target.value })}
                />
                <Button variant="success"
                        onClick={this.getRecommendation}
                        disabled={this.state.loading}>
                  <FontAwesomeIcon icon={faCar} className="me-1" />
                  Recommander
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    );
  }
}
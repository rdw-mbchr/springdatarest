import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
  render() {
    const toastCSS = {
      position: 'fixed', top: '20px', right: '20px', zIndex: 999,
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    };

    const { show, message, type = "success" } = this.props.children || {};

    return (
      <div style={show ? toastCSS : null}>
        <Toast className={`border text-white ${type === "success" ? "border-success bg-success" : "border-danger bg-danger"}`} show={show}>
          <Toast.Header className={`text-white ${type === "success" ? "bg-success" : "bg-danger"}`} closeButton={false}>
            <strong className="mr-auto">{type === "success" ? "Succès" : "Supprimé"}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}
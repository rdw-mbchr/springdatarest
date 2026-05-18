import React, { Component } from 'react';

export default class OAuth2Callback extends Component {
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/list';
    } else {
      window.location.href = '/login';
    }
  }

  render() {
    return <div className="text-white text-center mt-5">
      Connexion en cours...
    </div>;
  }
}
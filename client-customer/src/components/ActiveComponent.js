import axios from 'axios';
import React, { Component } from 'react';
import '../css/FormComponent.css';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtCode: ''
    };
  }
  render() {
    return (
      <div className="login">
        <div className="box-form">
          <h1>ACTIVE ACCOUNT</h1>
          <input type="text" placeholder="Username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
          <br />
          <input type='text' placeholder='Code' value={this.state.txtCode} onChange={(e) => { this.setState({ txtCode: e.target.value }) }} />
          <br />
          <div className="submitBtn">
            <button type='submit' onClick={(e) => this.btnActiveClick(e)}>
              ACTIVE
            </button>
          </div>
        </div>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const code = this.state.txtCode;
    if (username && code) {
      this.apiActive(username, code);
    } else {
      alert('Please input username and code');
    }
  }
  // apis
  apiActive(username, code) {
    const body = { username: username, code: code };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;
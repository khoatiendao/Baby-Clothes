import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import '../css/FormComponent.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    return (
      <div className="login">
        <div className="box-form">
          <h1>Đăng Nhập</h1>
          <input type='text' placeholder='Username' value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
          <br />
          <input type="password" placeholder="Password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
          <br />
          <div className="submitBtn">
            <button type='submit' onClick={(e) => this.btnLoginClick(e)}>
              Đăng Nhập
            </button>
          </div>
        </div>
      </div>
    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);
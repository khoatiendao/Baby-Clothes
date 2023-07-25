import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../Css/LoginComponent.css'


class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="login-container">
          <h2 className="login-title">Đăng Nhập ADMIN</h2>
          <form className="login-form">
            <div className="login-field">
              <label htmlFor="txtUsername">Username</label>
              <input
                type="text"
                id="txtUsername"
                value={this.state.txtUsername}
                onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div className="login-field">
              <label htmlFor="txtPassword">Password</label>
              <input
                type="password"
                id="txtPassword"
                value={this.state.txtPassword}
                onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="login-field">
              <input
                type="submit" value="Đăng Nhập" onClick={(e) => this.btnLoginClick(e)} className="login-btn"/>
            </div>
          </form>
        </div>
      );
    }
    return (<div />);
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
      alert('Vui lòng nhập tên đăng nhập và mật khẩu');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('http://localhost:8433/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;
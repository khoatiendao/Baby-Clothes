import React, { Component } from 'react';
import axios from 'axios';
import '../Css/SignupComponent.css';

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TxtEmail: '',
      TxtUsername: '',
      TxtPassword: ''
    };
  }

  // Xử lý sự kiện khi nhấp vào nút "Đăng Ký"
  handleRegisterClick(e) {
    e.preventDefault();
    const email = this.state.TxtEmail;
    const username = this.state.TxtUsername;
    const password = this.state.TxtPassword;
    if (email && username && password) {
      const accountAdmin = { email: email, username: username, password: password };
      this.apiSignUpAdmin(accountAdmin);
    } else {
      alert('Please input your information');
    }

  };
  // Code xử lý đăng ký ở đây
  apiSignUpAdmin(accountAdmin) {
    axios.post('http://localhost:8433/api/admin/signup-admin', accountAdmin).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  };
  // if (result.success === true) {
  //   // Xử lý thành công (nếu cần)
  //   alert('Đăng ký thành công!');
  // } else {
  //   // Xử lý thất bại (nếu cần)
  //   alert('Đăng ký thất bại!');
  // }


  render() {
    return (
      <div className="login">
        <div className="box-form">
          <h1>Đăng Ký</h1>
          <input type="email" placeholder="Email" value={this.state.TxtEmail} onChange={(e) => { this.setState({ TxtEmail: e.target.value }) }} />
          <br />
          <input type='text' placeholder='Username' value={this.state.TxtUsername} onChange={(e) => { this.setState({ TxtUsername: e.target.value }) }} />
          <br />
          <input type="password" placeholder="Password" value={this.state.TxtPassword} onChange={(e) => { this.setState({ TxtPassword: e.target.value }) }} />
          <br />
          <div className="submitBtn">
            <button type='submit' onClick={(e) => this.handleRegisterClick(e)}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupComponent;
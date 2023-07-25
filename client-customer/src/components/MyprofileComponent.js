import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import '../css/FormComponent.css';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="login">
        <div className="box-form">
          <h1>My Profile</h1>
          <input type="text" placeholder="Username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
          <br />
          <input type='password' placeholder='Password' value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
          <br />
          <input type="text" placeholder="Name" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
          <br />
          <input type="tel" placeholder="Phone" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
          <br />
          <input type="email" placeholder="Email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
          <br />
          <div className="submitBtn">
            <button type='submit' onClick={(e) => this.btnUpdateClick(e)}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('http://localhost:8433/api/customer/profile/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setCustomer(result);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Myprofile;
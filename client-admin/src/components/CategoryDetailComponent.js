import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../Css/CategoryDetailComponent.css'

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="category-detail-container">
      <h2 className="category-detail-title">CATEGORY DETAIL</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td className="category-detail-label">ID</td>
              <td><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} className="text_1" /></td>
            </tr>
            <tr>
              <td className="category-detail-label">Name</td>
              <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} className="text_1" /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} className="btn-add" />
                <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} className="btn-update" />
                <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} className="btn-delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('http://localhost:8433/api/admin/add-category', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành Công!');
        this.apiGetCategories();
      } else {
        alert('Thất Bại!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('http://localhost:8433/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('http://localhost:8433/api/admin/category/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành Công!');
        this.apiGetCategories();
      } else {
        alert('Thất Bại!');
      }
    });
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('http://localhost:8433/api/admin/category/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành Công');
        this.apiGetCategories();
      } else {
        alert('Thất Bại!');
      }
    });
  }
}
export default CategoryDetail;
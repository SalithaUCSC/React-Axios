import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [], user: [],
      name: "",
      age: 0,
      job: "",
      addMsg: "",
      deleteMsg: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getSingleUser = this.getSingleUser.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleJobChange(event) {
    this.setState({job: event.target.value});
  }

  handleAgeChange(event) {
    this.setState({age: event.target.value});
  }

  handleIdChange(event) {
    this.setState({id: event.target.value});
  }

  getUsers() {
    axios.get('http://localhost:8080/users/')
    .then((res) => {
      console.log(res.data);
      this.setState({users: res.data})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getSingleUser() {
    axios.get(`http://localhost:8080/users/${this.state.id}`)
    .then((res) => {
      console.log(res.data);
      this.setState({user: res.data})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  addUser(event) {
    event.preventDefault();

    const user = {
      name: this.state.name,
      job: this.state.job,
      age: this.state.age
    };

    axios.post('http://localhost:8080/users/add', user)
    .then(res => {
      console.log(res.data);
      this.setState({addMsg: "User is successfully added to the database"})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteUser(event) {
    event.preventDefault();

    axios.delete(`http://localhost:8080/users/delete/${this.state.id}`)
    .then(res => {
      console.log(res.data);
      this.setState({deleteMsg: "User is successfully deleted from database"})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">AXIOS HTTP CLIENT</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className="container" style={{marginTop: '50px'}}>
          <div className="card">
            <div className="card-body">
              <h4 className="text-left">GET REQUEST</h4><hr/>
              <div className="input-group mb-3">
                <input type="text" className="form-control" disabled placeholder="http://localhost:8080/users/"/>
                <span>
                  <button className="btn btn-success" onClick={this.getUsers}>GET USERS</button>
                </span>
              </div>
              <div className="row">
              <table className="table table-bordered table-striped" style={{marginRight: '15px', marginLeft: '15px'}}>
                <thead>
                  <tr>
                    <th width="25%">ID</th>
                    <th width="25%">Name</th>
                    <th width="25%">Age</th>
                    <th width="25%">Job</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user,i) => {
                    return (                      
                      <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.job}</td>
                      </tr>                     
                    )
                  })}
                </tbody>
              </table>  
              </div>              
              <br/>
              <h4 className="text-left">GET SINGLE REQUEST</h4><hr/>
              <div className="input-group mb-3">
              <input type="text" className="form-control" disabled placeholder="http://localhost:8080/users/{id}"/>
              <input type="text" className="form-control" name="id" onChange={this.handleIdChange} placeholder="User ID"/>
                <span>
                  <button className="btn btn-warning" onClick={this.getSingleUser}>GET USER</button>
                </span>
              </div>
              <div className="row">
              <table className="table table-bordered table-striped" style={{marginRight: '15px', marginLeft: '15px'}}>
                <thead>
                  <tr>
                    <th width="25%">ID</th>
                    <th width="25%">Name</th>
                    <th width="25%">Age</th>
                    <th width="25%">Job</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.user.id}</td>
                    <td>{this.state.user.name}</td>
                    <td>{this.state.user.age}</td>
                    <td>{this.state.user.job}</td>
                  </tr>                     
                </tbody>
              </table>  
              </div>              
              <br/>
              <h4 className="text-left">POST REQUEST</h4><hr/>
              <input type="text" className="form-control" disabled placeholder="http://localhost:8080/users/add"/>
              <br/>
              <form onSubmit={this.addUser}>
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <input type="text" className="form-control" name="name" onChange={this.handleNameChange} placeholder="Username"/>
                  </div>
                  <div className="col-md-3 mb-3">
                    <input type="text" className="form-control" name="job" onChange={this.handleJobChange} placeholder="Job"/>
                  </div>
                  <div className="col-md-3 mb-3">
                    <input type="text" className="form-control" name="age" onChange={this.handleAgeChange} placeholder="Age"/>
                  </div>                 
                  <span>
                    <button className="btn btn-primary" style={{marginTop: '0px'}}>ADD USER</button>
                  </span>                 
                </div>               
              </form>
              <p style={{color: 'green'}}>{this.state.addMsg}</p>
              <br/>
              <h4 className="text-left">DELETE REQUEST</h4><hr/>
              <input type="text" className="form-control" disabled placeholder="http://localhost:8080/users/delete/{id}"/>
              <br/>
              <form onSubmit={this.deleteUser}>
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <input type="text" className="form-control" name="id" onChange={this.handleIdChange} placeholder="User ID"/>
                  </div>            
                  <span>
                    <button className="btn btn-danger" style={{marginTop: '0px'}}>DELETE USER</button>
                  </span>                 
                </div>               
              </form>
              <p style={{color: 'red'}}>{this.state.deleteMsg}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

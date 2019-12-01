import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import Navbar from './components/Navegacion.js';
import Empleado from './components/Empleado.js';
import Resumen from './components/Resumen-empleado.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-notifications/lib/notifications.css';

const socket = io.connect('http://localhost:4000');
axios.defaults.baseURL = "http://localhost:4000";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/empleados" component={() => <Empleado axios={axios} socket={socket}/>}/>
            <Route exact path="/resumen" component={Resumen}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
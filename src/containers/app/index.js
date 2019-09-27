import React from 'react'
import logo from './logo_fff.png';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login/Login'
import Profile from '../profile/Profile'

import Footer from './Footer';
import Office from './Office'
import './App.css';

console.log('entry point');
const App = () => {
    return(
    <div className="App">
      <header>
        <Link to="/" className="panel"> 
            < img src={logo} className="logo" alt="logo" />
        </Link>
        <Link to="/about-us" className="fixheader">About</Link>
        <div className="entering"><Office/></div>
      </header>
      <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
      </main>
      <Footer/>
    </div>
    )
    };
export default App;
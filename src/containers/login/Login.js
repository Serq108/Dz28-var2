import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import './Login.css';
import { gate } from '../../modules/counter';
import Service from '../../service/service';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChangeLog = this.handleChangeLog.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleAcc = this.handleAcc.bind(this);
    this.handlelogOut = this.handlelogOut.bind(this);
  }
  handleChangeLog(event){
    this.setState({ username: event.target.value})
  }
  handleChangePass(event){
    this.setState({ password: event.target.value})
  }
  async submitForm(){
    //debugger
    await Service.getcook();
    let data = 'username' + '=' + this.state.username + '&' + 'password' + '=' + this.state.password;
    console.log(data);
    const auth = await Service.authPost(data);
    console.log(auth); 
    const getAcc = await Service.getAcc();
    console.log('getAcc ', getAcc);
    if(getAcc.user_id !== 'None'){
      let birthday = new Date(Date.parse(getAcc.birthday));
      this.props.gate(
        'Выход', 
        getAcc.Name, 
        getAcc.user_id,
        getAcc.first_name,
        getAcc.last_name,
        getAcc.email,
        getAcc.Group,
        birthday
      );
      this.props.changePage();
    }
  };
  async handleAcc(){
    const getAcc = await Service.getAcc();
    console.log(getAcc);
    if(getAcc.user_id !== 'None'){
      let birthday = new Date(Date.parse(getAcc.birthday));
      this.props.gate(
        'Выход', 
        getAcc.Name, 
        getAcc.user_id,
        getAcc.first_name,
        getAcc.last_name,
        getAcc.email,
        getAcc.Group,
        birthday
      );
    }
    return getAcc;
  }
  async handlelogOut(){
    const data = await Service.logOut();
    this.props.gate(
      'Вход', 
      '', 
      0, 
      '', 
      '', 
      '',
      '', 
      new Date(0)
  );
    return data;
  }

  
  render(){
    return (
      <div className="login-form">
        <h1>Please Login </h1>
        <div className="reg-link"  onClick={this.handleAcc}>or register</div>
        <input ref={(log) => this._input = log} type="text" placeholder="Login" onChange={this.handleChangeLog}/>
        <input ref={(pass) => this._input = pass} type="password" name="password" placeholder="password" onChange={this.handleChangePass}/>
        <input type="submit" value="log in" onClick={this.submitForm}/>
      </div>
    )
  }
}

//Умные компоненты <button onClick={this.handlelogOut}>logout</button>
const mapStateToProps = ({ counter }) => ({ 
  entering: counter.entering
}) 

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      gate,
      changePage: () => push('/')
    }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
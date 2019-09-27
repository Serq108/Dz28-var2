import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ru from "date-fns/locale/ru";


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Profile.css';
import { gate } from '../../modules/counter';
import Service from '../../service/service';

registerLocale("ru", ru);
class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: props.userId,
      first_name: props.first_name,
      last_name: props.last_name,
      email: props.email,
      date: props.birthday,
      formDate: moment(props.birthday).format('DD/MM/YYYY')
    }
    this.handleChangeFname = this.handleChangeFname.bind(this);
    this.handleChangeLname = this.handleChangeLname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(date){
    this.setState({ date: date});
    let sdtm = moment(date).format('DD/MM/YYYY');
    this.setState({ formDate: sdtm});
  }
  handleChangeFname(event){
    this.setState({ first_name: event.target.value})
  }
  handleChangeLname(event){
    this.setState({ last_name: event.target.value})
  }
  handleChangeEmail(event){
    this.setState({ email: event.target.value})
  }
  async submitForm(){
    let eventData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      date: this.state.date
    };
    let bdate = {birthday: eventData.date};
    delete eventData.date;
    let data = JSON.stringify(eventData);
    let url = 'usersupdate/' + this.state.userId + '/';
    let dataext = JSON.stringify(bdate);
    let urlext = 'acc/' + this.state.userId + '/';
    await Service.profUpdate(data, url);
    await Service.profUpdate(dataext, urlext);
    const getAcc = await Service.getAcc();
    console.log(getAcc);
  }
 
  render(){
    return (
      <div className="reg-form">
        <h1>User Profile</h1>
        <input ref={(fname) => this._input = fname} type="text" placeholder={this.state.first_name} onChange={this.handleChangeFname}/>
        <input ref={(lname) => this._input = lname} type="text" placeholder={this.state.last_name} onChange={this.handleChangeLname}/>
        <input ref={(mail) => this._input = mail} type="text" placeholder={this.state.email} onChange={this.handleChangeEmail}/>
        
        <DatePicker  
          selected={this.state.date}
          locale="ru"
          placeholder={this.state.date} 
          onChange={this.onChange} 
          value={this.state.formDate}
          showYearDropdown
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={15}
          scrollableYearDropdown/>
        <input type="submit" value="Send" onClick={this.submitForm}/>
      </div>
    )
  }
}

 //Умные компоненты <button onClick={this.handlelogOut}>logout</button>
const mapStateToProps = ({ counter }) => ({ 
  userId: counter.userId,
  first_name: counter.first_name,
  last_name: counter.last_name,
  email: counter.email,
  birthday: counter.birthday
}) 

const mapDispatchToProps = dispatch => bindActionCreators({
      gate,
    }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile) 
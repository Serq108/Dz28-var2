import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { gate } from '../../modules/counter';

import Service from '../../service/service';

class Office extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        username: '',
      }
      this.handlelogOut = this.handlelogOut.bind(this);
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
        this.props.changePage();
        return data;
    }
    
      
    render(){
        if(this.props.entering === 'Выход'){  
            return (
                <div>
                    <Link to="/profile" className="office">{this.props.username}</Link>
                    <button className="login" onClick={this.handlelogOut}>
                        {this.props.entering}
                    </button>
                </div>
            )
        }else{
            return (
                <div>
                    <Link to="/login" className="login" >
                        {this.props.entering}
                    </Link>
                </div>
            )
        }
    }
}

//Умные компоненты
const mapStateToProps = ({ counter }) => ({
    entering: counter.entering,
    username: counter.username,
    userId: counter.userId
  })
  
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        gate,
        changePage: () => push('/')
    },dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Office)
import React, { Component } from 'react';
import './mainPage.css'
import  AllUsersView from '../User/AllUseresView'

class MainPage extends Component{
constructor(props){
    super(props)
    this.logo='/media/logo_keren.png';
   
}
render(){
    //debugger;
    return(
        <span>
            <img src={this.logo} />
            <AllUsersView/>
        </span>
    );
}

}
export default MainPage;

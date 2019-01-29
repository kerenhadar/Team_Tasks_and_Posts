import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import User from "./User";
import DALUtils from "../DALUtils";
import {connect} from 'react-redux';
import "../App.css"


class OneUserView extends Component {
  constructor(props) {
    super(props);
    //console.log("in constructor");
    //console.log(this.props.jsonUser);
   
    this.state = {
      user: this.props.jsonUser,
      visClass: "hidemore",
      stMoreOrLess: "more..",
      TbClass: "oneUserTb",
      oldTbClass: ""
    };
    this.objNewUser=Object;
    this.txtClass = "reg_txt";
    
  }

  static getDerivedStateFromProps(props, state) {
    //console.log("**getDerived" + state.user.id);
    
    var TbClass;
    if (state.user.id==props.curUserId){
      TbClass = "oneUserTb selectedTb"
    }else{
      TbClass = "oneUserTb"
    }
    return({oldTbClass: state.TbClass,
            TbClass: TbClass})
  }

  componentDidMount() {
    //console.log("**DidMount " + this.state.user.id);
  }

  componentDidUpdate() {
    //console.log("**DidUpdate " + this.state.user.id);
  }

  shouldComponentUpdate(prevProps, state) {
    
    if ((state.user!==this.state.user) || 
        (state.visClass!==this.state.visClass)||
        (state.oldTbClass!==state.TbClass)){
      return true;
    }else{
      return false;
    };
    //return true;
  }
  //Handle "Show/Hide" button
  ToggleMore = () => {
    //debugger;
    if (this.state.visClass == "hidemore") {
      this.setState({ visClass: "showmore", stMoreOrLess: " Less... " });
    } else {
      this.setState({ visClass: "hidemore", stMoreOrLess: "More.." });
    }
  };

  validate() {
    
    return true;
  }

  getFormData(e) {
    e.preventDefault(); ///cancels reloading which is the default behavior of the browser

    //get the data from the form : e.target is the <form> tag
      var objNewUser = new User();
      objNewUser.id = this.state.user.id;
      objNewUser.name = e.target.txt_name.value;
      objNewUser.email = e.target.txt_email.value;
      objNewUser.address.city = e.target.txt_city.value;
      objNewUser.address.street = e.target.txt_street.value;
      objNewUser.address.zipcode = e.target.txt_zipcode.value;
      
      this.objNewUser = objNewUser;
      
      if (this.validate()) {
      objNewUser = this.objNewUser;

      this.props.dispatch({ type : 'UPDATE_USER', data:
                                    {id: objNewUser.id,
                                      name: objNewUser.name,
                                      email: objNewUser.email,
                                      address: {city: objNewUser.city,
                                                street: objNewUser.street,
                                                zipcode: objNewUser.zipcode
                                              }

                                    }}
                                  )
                  
     
      
    } else {

    }
  }

  changeUserId = () =>{
      //if store "cur User id" is already the user of this instabce - no need to change the 
      //shown tasks and posts  
      
      if (this.state.user.id != this.props.curUserId){
        
         this.props.dispatch({  type : 'SET_CUR_USER_BY_ID', 
                                newUserId:this.state.user.id
                              }
                            )
          
      }
  }




  deleteUser(e){
  

    if ( window.confirm("Delete this user?") ) // true if OK is pressed  
    {
      this.props.dispatch({"type": "DELETE_USER", "data": this.state.user.id});
    }
    
  }

  addTask(e){
       
    this.props.dispatch({"type": "SET_CUR_USER_BY_ID", "newUserId": this.state.user.id});
    this.props.dispatch({"type": "ADD_TASK", "data": this.state.user.id});
    
  }

  addPost(e){
       
    this.props.dispatch({"type": "SET_CUR_USER_BY_ID", "newUserId": this.state.user.id});
    this.props.dispatch({"type": "ADD_POST", "data": this.state.user.id});

  }

  render() {
    

    return (
      <form
        noValidate
        name={"frm" + this.state.user.id}
        onSubmit={e => this.getFormData(e)}
      >
        <table  id="tb{this.state.user.id}" class={this.state.TbClass}>
          <tr>
            <td>ID:</td>
            <td>{this.state.user.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              <input
                className={this.state.class}
                name="txt_name"
                required
                type="text"
                defaultValue={this.state.user.name}
                onChange={() => void null}
                onMouseDown={() => this.changeUserId()}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                name="txt_email"
                type="email"
                defaultValue={this.state.user.email}
                onMouseDown={() => this.changeUserId()}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" border="1px">
              <br />
              <button className="more"
              onMouseEnter={this.ToggleMore}>{this.state.stMoreOrLess}</button>
              <br /><br />
            </td>
          </tr>
          <tr className={this.state.visClass}>
            <td>City:</td>
            <td>
              <input 
                name="txt_city"
                type="text"
                defaultValue={this.state.user.address.city}
              />
            </td>
          </tr>
          <tr className={this.state.visClass}>
            <td>Street:</td>
            <td>
              <input
                name="txt_street"
                required
                type="text"
                defaultValue={this.state.user.address.street}
              />
            </td>
          </tr>
          <tr className={this.state.visClass}>
            <td>Zip:</td>
            <td>
              <input
                name="txt_zipcode"
                required
                type="text"
                defaultValue={this.state.user.address.zipcode}
              />
            </td>
          </tr>
             
          <tr>
            
            <td colspan="2" align="left">
              <input type="button" class="mybutton" onClick={e => this.deleteUser(e)} value="Delete User"/>
              &nbsp;
              <input type="button" class="mybutton" onClick={e => this.addTask(e)} value="Add Task"/>
              &nbsp;
              <input type="button" class="mybutton" onClick={e => this.addPost(e)} value="Add Post"/>
              &nbsp;
              <input type="submit" class="mybutton" value="Save" />
            </td>
          </tr>
        </table>
      </form>
    );
  }
}
const mapStateToProps = (appState) =>
{
  return {arrUsers : appState.arrUsers,
          curUserId: appState.curUserId}
}
export default connect(mapStateToProps)(OneUserView);


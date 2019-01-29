import React, { Component } from "react";
import {connect} from 'react-redux';
import "../App.css";
import OneUserView from "./OneUserView";
import AllTasksView from "../Task/AllTasksView";
import AllPostsView from "../Post/AllPostsView";
import DAL from "../DALUtils"
import User from "./User"




class AllUsersView extends Component {
  constructor(props) {
    super(props);
    //sortById=1-ascending  2-descending
    //txtSearch - for search textbox - search by partial user.name
    //afterAddUser - flag for adding user cycle - to control render(1-force after reducer action, 2-stop after rendering page).
    this.state={arrUsers: [],
                txtSearch: "",
                afterAddUser: 0,
                sortById: "ASC"
                }
  
    
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    //save users from props(appState) to local state
   
    //UpdateCycle phases: 
    //0 = not in "adding a user" cycle ; 
    //1 = after adding an empty user in reducer, before rendering. 
    //2=after rendering, finish cycle by restarting state.afterAddUser

    var UpdateCycle; 
    var sortById = prevState.sortById;

    switch (nextProps.afterAddUser){
      case 0:
        UpdateCycle = 0;
        break;
      case 1: //from appstore
        UpdateCycle = 1;
        sortById = "DESC"
        break;
    }
     
    if (prevState.afterAddUser ==2){ //from after update
      UpdateCycle = 0; 
      sortById = "DESC"
      
    }

    return ({arrUsers: nextProps.arrUsers, 
            afterAddUser: UpdateCycle, 
            sortById: sortById}); 
  }

  componentDidMount(props, state) {

    if (this.props.start==0)
    {
      DAL.getData("users")
      .then(res=>{
          var curUserId = res.data[0].id;
          var arrUsers = res.data; 
          DAL.getData("todos").then(res=>{
            var arrTasks = res.data; 
            DAL.getData("posts").then(res=>{
              var arrPosts = res.data; 
              this.props.dispatch({ type : 'TYPE_BUILD_INITIAL_STATE', 
              users: arrUsers,
              tasks: arrTasks,
              posts: arrPosts,
              curUserId: curUserId
            }
            
            );
           
          })
        })
      })
    }  
  }
 
  

  shouldComponentUpdate(p,s){
   
    if (s.afterAddUser==2){
      return false;
    }
    return true;
  }

  componentDidUpdate(){
    //after rendering with the new user, prepare flag for next time
    //debugger;
    if (this.state.afterAddUser==1){
      this.props.dispatch({type: "FINISH_ADD_USER"});
      this.setState({afterAddUser: 2})
    }

    
  }
  filterUsers(e){
    this.flagForceUpdate = true;
    this.setState({txtSearch: e.target.value}) 
  }
  
  addUser(e){
       
    var user = new User;
    this.props.dispatch({"type": "ADD_USER", "data": user});

  }

  changeSort(sort){
    console.log(sort)
    if (sort=="up") {
      this.setState({sortById: "ASC"})
   }else{
      this.setState({sortById: "DESC"})
    }
  }
  
  render() {
   //debugger;
    var arr1=this.state.arrUsers;
    
  
    //handle "search" 
    if(this.state.txtSearch!=="" ){
      var txt = this.state.txtSearch;
      arr1=arr1.filter(obj => {if ((obj.name.includes(txt)) || 
                                    (obj.email.includes(txt)))
                                {return obj}
                              })
    }
    
    console.log(this.state.sortById)
    if ((this.state.sortById=="ASC")||((this.sortById==""))) {
      arr1.sort((obj1,obj2)=>{return obj1.id - obj2.id});
    }else{
      arr1.sort((obj1,obj2)=>{return obj2.id - obj1.id});
    }

    var arr2=[];

    if (arr1!='undefined'){
      if ((arr1.length)>0){
        arr2 = arr1.map(jsonUser => <OneUserView  key={jsonUser.id} jsonUser={jsonUser} />);
      }
    }else{
      arr2=[];
    }
    
    return (
      <span >
        <table border="1" className="AllUsersTb" align="center" width="1200px">
          <tr>
            <td align="left" width="700px">
              <table  align="left">    
                <tr>
                  <td class="td_actions">
                  <table class="myTable">
                    <tr>
                      <td class="td_actions">
                      Search:&nbsp; 
                      <input class="searchText"
                              onChange={e => this.filterUsers(e)}>
                              </input>  
                      </td>
                      <td class="buttton_td">
                        <input type="button" class="mybutton" onClick={e => this.addUser(e)} value="Add"/>
                      </td>
                      
                      <td class="buttton_td">
                        <img class="arrow_icon" src="../media/arrow_up.jpg" onClick={e => this.changeSort("up")}/>  
                      </td>
                      <td class="buttton_td">
                        <img class="arrow_icon" src="../media/arrow_down.jpg"  onClick={e => this.changeSort("down")}/>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                  </table>
                   
                  
                  </td>
                  <td colspan="2">&nbsp;</td>
                </tr>  
                <tr class="title">
                  <td class="users_tr">
                    <h3> Users </h3>
                  </td>
                  <td class="main_tr">
                    <h3> Tasks </h3>
                  </td>
                  <td class="main_tr">
                    <h3> Posts </h3>
                  </td>
                </tr> 
                <tr>
                  
                  <td align="left" class="user_tr">
                    {arr2}
                  </td>
                  <td>
                    <AllTasksView/>
                  </td>
                  <td>
                    <AllPostsView/>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </span>
    );
  }
}
const mapStateToProps = (appState) =>
{
  
 
  return {arrUsers: appState.arrUsers,
          start:    appState.start,
          afterAddUser: appState.afterAddUser
        }
}
export default connect(mapStateToProps)(AllUsersView);


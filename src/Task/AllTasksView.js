import React, { Component } from "react";
import {connect} from 'react-redux';
import "./OneTaskView"
import "../App.css";

import OneTaskView from "./OneTaskView";

class AllTasksView extends Component {
  constructor(props){
    super(props);
    //props.curUserId comes from appStore. 
    console.log("*AllTasks - constructor")
    this.state={curUserId: props.curUserId, 
                arrTasks:[],
                afterDeleteTask: 0,
                afterAddTask: 0,
                sortById: "DESC"
                };  
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    //debugger;
    var curUserId;
    var arrTasks;

    if(prevState.curUserId != 'undefined'){
      curUserId = nextProps.curUserId;
    }
    if (nextProps.arrTasks !== 'undefined') {
      arrTasks = nextProps.arrTasks;
    }
    
    return({curUserId: curUserId, 
            arrTasks: arrTasks, 
            afterDeleteTask: nextProps.afterDeleteTask,
            afterAddTask: nextProps.afterAddTask})
  }


  shouldComponentUpdate(nextProps, nextState) {
      //if curUserId has changed - re render
      console.log("*AllTasks - should")
      //debugger;
      if ((this.state.curUserId !== nextState.curUserId) || 
          (this.state.curUserId !== nextProps.curUserId) || 
          (this.state.afterDeleteTask !== nextProps.afterDeleteTask)||
          (this.state.afterAddTask !== nextProps.afterAddTask))
      {
            
        this.setState({curUserId: nextProps.curUserId})
        return true;
      }else{
        
        return false;
      }
  }

  componentDidUpdate(s,p){
    debugger;
    this.props.dispatch({type: "FINISH_ADD_TASK"});
    this.props.dispatch({type: "FINISH_DELETE_TASK"});
  }

  render() {
  console.log("*AllTasks - render")
    var arr1=this.state.arrTasks;
    
    if (arr1!='undefined'){
      if (this.state.curUserId !==0){
        var arr2 = arr1.filter(task => task.userId==this.state.curUserId);

        if ((this.state.sortById=="ASC")||((this.sortById==""))) {
          arr2.sort((obj1,obj2)=>{return obj1.id - obj2.id});
        }else{
          arr2.sort((obj1,obj2)=>{return obj2.id - obj1.id});
        }
        //key is added in order to changes be reflected after change in curUserID, 
        //when the array contains tasks of another user.
        arr2 = arr2.map(task => <OneTaskView key={task.id} task={task}/>);
      }
      
    }
 
    return (
      <span>
        <table class="AllTasksTb">
          <tr>
            <td align="left" width="500px">
           
              {arr2}
            </td>
          </tr>
        </table>
      </span>
    );
  }
}


const mapStateToProps = (appState) =>
{
  //debugger;
  return {arrTasks : appState.arrTasks,
          curUserId: appState.curUserId,
          afterDeleteTask: appState.afterDeleteTask,
          afterAddTask: appState.afterAddTask
  }
}

export default connect(mapStateToProps)(AllTasksView);


import React, { Component } from "react";
import Task from "./Task";
import {connect} from 'react-redux';

class OneTaskView extends Component {
  constructor(props) {
    super(props);
    var completeCheckText="";
    //get current task by id:
    
    this.state = {
      task: this.props.task,
      task_completed:this.props.task.completed,
      visClass: "hidemore",
      stMoreOrLess: "more..",
       
    };
    
    this.objNewTask=Object;
    this.txtClass = "reg_txt";
  }

  

  validate() {
    return true;
  }

  getFormData(e) {
    e.preventDefault();
    console.log("get form data")
    //debugger;
    //get the data from the form : e.target is the <form> tag
      var objNewTask = new Task();
      objNewTask.id = this.state.task.id;
      objNewTask.userId = this.state.task.userId;
      objNewTask.title = e.target.txt_title.value;
      objNewTask.completed = e.target.chk_complete.checked;
      
      this.props.dispatch({ "type" : 'UPDATE_TASK', 
                            "newTask":   {"id": objNewTask.id,
                                      "userId": objNewTask.userId,
                                      "title": objNewTask.title,
                                      "completed": objNewTask.completed
                                    }}
                                  )
      
  }

  deleteTask(e){
    if ( window.confirm("Delete this task?") ) // true if OK is pressed  
    {
    this.props.dispatch({"type": "DELETE_TASK", "data": this.state.task.id});
    this.props.dispatch({"type": "SET_CUR_USER", "data": this.state.task.userId});
    }
  }

  render() {
    
    return (
      <form
        noValidate
        name={"frm" + this.state.task.id}
        onSubmit={e => this.getFormData(e)}
      >
        <table class="oneTaskTb">
          <tr>
            <td>ID:</td>
            <td>{this.state.task.userId} - {this.state.task.id}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>
              <input
                
                name="txt_title"
                required
                type="text"
                defaultValue={this.state.task.title}
                />
            </td>
          </tr>

          <tr>
            <td>Complete:</td>
            <td>
              <input
                name="chk_complete"
                type="checkbox" 
                defaultChecked={this.state.task.completed}
                />
             
          
            </td>
          </tr>
          <tr>
          
            <td colspan="2" align="left">
            <input type="button" class="mybutton" onClick={e => this.deleteTask(e)} value="Delete Task"/>
              &nbsp;
              <input class="mybutton" type="submit" value="Save" />
            </td>
          </tr>
        </table>
      </form>
    );
  }
}
const mapStateToProps = (appState) =>
{ 
  return {arrTasks : appState.arrTasks}
}
export default connect(mapStateToProps)(OneTaskView);


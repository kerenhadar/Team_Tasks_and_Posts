import React, { Component } from "react";
import Post from "./Post";
import {connect} from 'react-redux';

class OnePostView extends Component {
  constructor(props) {
    super(props);
    
    //get current Post by id:
    
    this.state = {
      post: this.props.post,
     
       
    };
    
    this.objNewPost=Object;
   
  }



  validate() {
    return true;
  }

  getFormData(e) {
    e.preventDefault();
    console.log("get form data")
    //debugger;
    //get the data from the form : e.target is the <form> tag
      var objNewPost = new Post();
      objNewPost.id = this.state.post.id;
      objNewPost.userId = this.state.post.userId;
      objNewPost.title = e.target.txt_title.value;
      objNewPost.body = e.target.txt_body.value;
      
      this.props.dispatch({ "type" : 'UPDATE_POST', 
                            "newPost":   {"id": objNewPost.id,
                                      "userId": objNewPost.userId,
                                      "title": objNewPost.title,
                                      "body": objNewPost.body
                                    }}
                                  )
      
  }

  deletePost(e){
    if ( window.confirm("Delete this Post?") ) // true if OK is pressed  
    {
    this.props.dispatch({"type": "DELETE_POST", "data": this.state.post.id});
    this.props.dispatch({"type": "SET_CUR_USER", "data": this.state.post.userId});
    }
  }

  render() {
    
    return (
      <form
        noValidate
        name={"frm" + this.state.post.id}
        onSubmit={e => this.getFormData(e)}
      >
        <table class="onePostTb">
          <tr>
            <td>ID:</td>
            <td>{this.state.post.userId} - {this.state.post.id}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>
              <input
                className={this.state.class}
                name="txt_title"
                required
                type="text"
                defaultValue={this.state.post.title}
                />
            </td>
          </tr>

          <tr>
          <td>Body:</td>
            <td>
              <textarea
                name="txt_body"
                
                rows="3"
                defaultValue={this.state.post.body}
                />
            </td>
          </tr>
          <tr>
          
            <td colspan="2" align="left">
            <input type="button" class="mybutton" onClick={e => this.deletePost(e)} value="Delete Post"/>
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
  return {arrPosts : appState.arrPosts}
}
export default connect(mapStateToProps)(OnePostView);


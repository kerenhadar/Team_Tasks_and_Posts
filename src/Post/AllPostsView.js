import React, { Component } from "react";
import {connect} from 'react-redux';
import "./OnePostView"
import "../App.css";

import OnePostView from "./OnePostView";

class AllPostsView extends Component {
  constructor(props){
    super(props);
    //props.curUserId comes from appStore. 
    console.log("*AllPosts - constructor")
    this.state={curUserId: props.curUserId, 
                arrPosts:[],
                afterDeletePost: 0,
                afterAddPost: 0,
                sortById: "DESC"
                };  
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("*AllPosts - getDerived")
    var curUserId;
    var arrPosts;

    if(prevState.curUserId != 'undefined'){
      curUserId = nextProps.curUserId;
    }
    if (nextProps.arrPosts !== 'undefined') {
      arrPosts = nextProps.arrPosts;
    }
    
    return({curUserId: curUserId, 
            arrPosts: arrPosts, 
            afterDeletePost: nextProps.afterDeletePost,
            afterAddPost: nextProps.afterAddPost})
  }


  shouldComponentUpdate(nextProps, nextState) {
      //if curUserId has changed - re render
      console.log("*AllPosts - should")
      if ((this.state.curUserId !== nextState.curUserId) || 
          (this.state.curUserId !== nextProps.curUserId) || 
          (this.state.afterDeletePost !== nextProps.afterDeletePost)||
          (this.state.afterAddPost !== nextProps.afterAddPost))
      {
            
        this.setState({curUserId: nextProps.curUserId})
        return true;
      }else{
        
        return false;
      }
  }

  componentDidUpdate(s,p){
    this.props.dispatch({type: "FINISH_ADD_POST"});
    this.props.dispatch({type: "FINISH_DELETE_POST"});
  }

  render() {
  console.log("*AllPosts - render")
    var arr1=this.state.arrPosts;
    
    if (arr1!='undefined'){
      if (this.state.curUserId !==0){
        var arr2 = arr1.filter(Post => Post.userId==this.state.curUserId);
        
        if ((this.state.sortById=="ASC")||((this.sortById==""))) {
            arr2.sort((obj1,obj2)=>{return obj1.id - obj2.id});
        }else{
            arr2.sort((obj1,obj2)=>{return obj2.id - obj1.id});
        }


        //key is added in order to changes be reflected after change in curUserID, 
        //when the array contains Posts of another user.

        arr2 = arr2.map(Post => <OnePostView key={Post.id} post={Post}/>);
      }
      
    }
 
    return (
      <span>
        <table class="AllPostsTb">
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
  console.log("*AllPosts - MSTP")
  return {arrPosts : appState.arrPosts,
          curUserId: appState.curUserId,
          afterDeletePost: appState.afterDeletePost,
          afterAddPost: appState.afterAddPost
  }
}

export default connect(mapStateToProps)(AllPostsView);


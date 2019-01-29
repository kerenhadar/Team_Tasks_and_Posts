
//state is the  app-store.
//initialize state 

var s0={"start": 0,
        "afterAddUser": 0, 
        "afterDeleteTask": 0, 
        "afterAddTask": 0, 
        "afterDeletePost": 0,
        "afterAddPost": 0, 
        "curUserId" :0, 
        "curUserObj":"",     
        "arrUsers": [],
        "curTaskID": "",
        "curTaskObj": "",
        "arrTasks":[],
        "curPostID": "",
        "curPostObj": "",
        "arrPosts":[]

}

 function findMax(a,b) {
    if (a>b)
        return a
    else
    return b;
}
const mainReducer = (state = s0 ,actionData) =>{
    //console.log("*actionData.type is:" );
    //console.log(actionData.type);
    
    switch(actionData.type){
        //TYPE_BUILD - moving data from axios to store - only 1st time when the app starts
        // and DAL is called from allUsersView - componentDidMount 
        //and this.props.data.start==0.
        case "TYPE_BUILD_INITIAL_STATE":
        {
            //debugger;
            const newState = { ...state };
            newState.arrUsers = actionData.users;
            console.log(newState.arrUsers);
            newState.arrUsers = newState.arrUsers.map(obj => { var o = obj;
                                            o[o.id] = o.id;
                                            return o;})
            console.log(newState.arrUsers);
            newState.arrTasks = actionData.tasks;
            newState.arrPosts = actionData.posts;
            newState.curUserId = actionData.curUserId; 
            newState.start=1;
            return newState
        }
        break;
        case 'SET_CUR_USER_BY_ID':
            
            var newState1 = setCurUser({ ...state }, actionData.newUserId);
            return newState1;

        case 'SET_CUR_TASK_BY_ID':
        {break;}
        case 'SET_CUR_POST_BY_ID':
        {break;}
        case 'UPDATE_USER' : 
        {
            
            var newState2 = { ...state };
            newState2.arrUsers = newState2.arrUsers.map(user=>{
                if (user.id==actionData.data.id){
                    
                    return actionData.data //replace the old user with a new user
                }else{
                    return user;
                }
            })
            
            return newState2
            break;
        }
        case 'DELETE_USER' : 
            var newState4 = { ...state };
            newState4.arrUsers = newState4.arrUsers.filter(user=>(user.id!==actionData.data));
            newState4.arrTasks = newState4.arrTasks.filter(task=>(task.userId!==actionData.data));
            newState4.arrPosts = newState4.arrPosts.filter(post=>(post.userId!==actionData.data));
        
            return newState4
            break;
        case 'ADD_USER' :
            
            var newState3 = { ...state };

            var maxid = 0;
            newState3.arrUsers.forEach(obj=>{
                if (obj.id > maxid){
                    maxid = obj.id;
                }
            })
            
            var user = {"id": (parseInt(maxid)  + 1),
                        "email": actionData.data.email,
                        "address": actionData.data.address};
            newState3.arrUsers.push(user);
           
            newState3.afterAddUser = 1;
            
            return newState3;
            break;
        case "FINISH_ADD_USER":
            
            var newState10 = { ...state };
            newState10.afterAddUser = 0;

            return newState10;
            break;
        case "FINISH_ADD_TASK":
            //debugger;
            var newState11 = { ...state };
            if (newState11.afterAddTask==1){
                newState11.afterAddTask = 0;
                return newState11;
            }else{
                return state;
            }
            break;
        case "FINISH_ADD_POST":
            //debugger;
            var newState12 = { ...state };
            if (newState12.afterAddPost==1){
                newState12.afterAddPost = 0;
                return newState12;
            }else{
                return state;
            }
            break;
        case 'UPDATE_TASK' : 
            //actionData.newTask = some updated  task
            var newState9 = { ...state };
            //replace the old task with a new task
            newState9.arrTasks = newState9.arrTasks.map(task=>
                {
                    if (task.id==actionData.newTask.id){
                        return (actionData.newTask)
                    }else{
                        return (task);
                    }
                }
            )

            return newState9;
            break;
        case 'UPDATE_POST' : 
            //actionData.newPost = some updated  post
            var newState13 = { ...state };
            //replace the old post with a new task
            newState13.arrPosts = newState13.arrPosts.map(post=>
                {
                    if (post.id==actionData.newPost.id){
                        return (actionData.newPost)
                    }else{
                        return (post);
                    }
                }
            )

            return newState13;
            break;
        case 'DELETE_TASK' : 
        var newState4 = { ...state };
            
            newState4.arrTasks = newState4.arrTasks.filter(task=>(task.id!==actionData.data));
            newState4.afterDeleteTask=1;

            return newState4
        case 'DELETE_POST' :
            var newState6 = { ...state };
                
            newState6.arrPosts = newState6.arrPosts.filter(post=>(post.id!==actionData.data));
            newState6.afterDeletePost=1;
            return newState6;
        
            case "FINISH_DELETE_TASK":
            //debugger;
            var newState14 = { ...state };
            if (newState14.afterDeleteTask==1){
                newState14.afterDeleteTask = 0;
                return newState14;
            }else{
                return state;
            }
            break;
        case "FINISH_DELETE_POST":
            //debugger;
            var newState15 = { ...state };
            if (newState15.afterDeletePost==1){
                newState15.afterDeletePost = 0;
                return newState15;
            }else{
                return state;
            }
            break;
        case 'ADD_TASK': 
        
            var newState5 = { ...state };
           //get max task id
           var maxid = 0;
           newState5.arrTasks.forEach(obj=>{
               if (obj.id > maxid){
                   maxid = obj.id;
               }
           })
            var task = {"id": (parseInt(maxid)  + 1),
                        "userId": actionData.data,
                        "title": "",
                        "completed": false};
            newState5.arrTasks.push(task);
            newState5.afterAddTask = 1;
            return newState5;
            break;
        case 'ADD_POST' : 
            var newState7 = { ...state };
            //get max task id
            var maxid = 0;
            newState7.arrPosts.forEach(obj=>{
                if (obj.id > maxid){
                    maxid = obj.id;
                }
            })
            var post = {"id": (parseInt(maxid)  + 1),
                        "userId": actionData.data,
                        "title": "",
                        "body": ""};
            newState7.arrPosts.push(post);
            newState7.afterAddPost = 1;
            return newState7;
        
        
        default:
        {
            return state;
        }
    }


  
}

function setCurUser(state,newUserId){
  
    var newState = state;
    if (newUserId!=(state.curUserId))
    {
        newState.curUserId = newUserId;
        return newState;
    }
    else
    {
        return state;
    }
}
export default mainReducer;
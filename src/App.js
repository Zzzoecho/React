import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut} from './leanCloud'
import $ from 'jquery'
// import AV from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
  }
  render() {

    let todos = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item,index)=>{
      return ( 
        <li key={index} >
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
            onDelete={this.delete.bind(this)}/>
        </li>
      )
    })

    return (
      <div className="App">
        <link rel="stylesheet" href="https://at.alicdn.com/t/font_k75b3cufccakmx6r.css"/>
        {this.state.user.id ? 
        <div className="Todo">
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>Sign Out</button> : null}
          <p>{this.state.user.username||'我'}的待办
            
          </p>
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo} 
              onChange={this.changeTitle.bind(this)}
              onSubmit={this.addTodo.bind(this)} />
          </div>
          <ol className="todoList">
            {todos}
          </ol>
          <i className="iconfont icon-add" onClick={this.showInput.bind(this)}></i>
        </div> : null}
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
          
      </div>
    )
  }
  // loadList(){
  //   var Todo = AV.Object.extend('Todo');
  //   var TodoFolder = AV.Object.extend('TodoFolder');
  //   var todoFolder = new TodoFolder()
  //   let data = JSON.stringify(this.state.todoList)
  //   console.log(data)
  //   todoFolder.set('content',data)
  //   todoFolder.save().then(function (todo){
  //     let stateCopy = JSON.parse(JSON.stringify(this.state))
  //     stateCopy.todoList.id = todo.id
  //     this.setState(stateCopy)
  //   }, function (error){
  //     console.error(error)
  //   })
  // }
  signOut(){
    signOut()
    $('.App .Todo').hide()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state)) 
    stateCopy.user = user
    this.setState(stateCopy)
  }
  componentDidUpdate(){
  }
  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state) 
  }
  showInput(){
    $('.inputWrapper').show()
  }
}

export default App;

let id = 0

function idMaker(){
  id += 1
  return id
}
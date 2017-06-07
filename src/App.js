import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
import $ from 'jquery'
import AV from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
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
        <link rel="stylesheet" href="https://at.alicdn.com/t/font_58snzvn4qatqehfr.css"/>
        {this.state.user.id ? 
        <div className="Todo">
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>Sign Out</button> : null}
          <p>{this.state.user.username||'我'}的待办</p>
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
  componentDidMount(todo){
    // this.fetchData.call(this)
  }
  // fetchData(){
  //   let stateCopy = JSON.parse(JSON.stringify(this.state))
  //   let user = AV.User.current()
  //   if(user){
  //     stateCopy['user'] = user.get('username')
  //     let Todo = AV.Object.extend('Todo')
  //     let todo = new Todo()
  //     // var todo = AV.Object.createWithoutData('Todo')
  //     let id = todo.id
  //     stateCopy.todoList = todo.get('title')
  //     this.setState(stateCopy) 
  //   } else {
  //   return
  //  }
  // }
  toggle(e, todo){
    // let oldStatus = todo.status
    // todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      // todo.status = oldStatus
      this.setState(this.state)
    })
     
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '', 
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })  
  }
  delete(event, todo){
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  showInput(){
    $('.inputWrapper').show()
  }
}

export default App;
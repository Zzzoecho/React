import React, { Component } from 'react';
import './TodoItem.css'
import $ from 'jquery'

export default class TodoItem extends Component {
    render(){
        return (
        <div className="TodoItem">
            <link rel="stylesheet" href="https://at.alicdn.com/t/font_k75b3cufccakmx6r.css"/>
            
            <input type="checkbox" id="items" checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}/> 
            <label className="label" htmlFor="items"></label>
            <span className="title">{this.props.todo.title}</span>
            
            <i className="iconfont icon-del" onClick={this.delete.bind(this)}></i>
        </div>
        )
    }
    toggle(e){
        this.props.onToggle(e, this.props.todo)
    }
    delete(e){
        this.props.onDelete(e, this.props.todo)
    }
}
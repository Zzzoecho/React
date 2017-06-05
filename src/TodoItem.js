import React, { Component } from 'react';
import './TodoItem.css'
import $ from 'jquery'

export default class TodoItem extends Component {
    render(){
        return (
        <div className="TodoItem">
            <link rel="stylesheet" href="https://at.alicdn.com/t/font_k75b3cufccakmx6r.css"/>
            <label className="label" htmlFor="items" onClick={this.turn.bind(this)}></label>
            <input type="checkbox" id="items" checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}/> 
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
    turn(){
        $('.TodoItem label').css({
            'background': "url(http://oo7a0zmzl.bkt.clouddn.com/17-6-5/87148093.jpg)",
            'background-position':'-1px -1px'
        })
    }
}
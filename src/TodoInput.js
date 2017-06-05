import React, {Component} from 'react';
import './TodoInput.css'
import $ from 'jquery'

export default class TodoInput extends Component {
    render(){
        return <input type="text" placeholder="输入待办事项" value={this.props.content}
            className="TodoInput"
            onChange={this.changeTitle.bind(this)}
            onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key === 'Enter'){
            this.props.onSubmit(e)
            $('.inputWrapper').hide()
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }

}

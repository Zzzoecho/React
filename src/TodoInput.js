import React from 'react';
import './TodoInput.css'
import $ from 'jquery'

export default function (props) {
    return <input type="text" placeholder="输入待办事项" value={props.content}
        className="TodoInput"
        onChange={changeTitle.bind(null, props)}
        onKeyPress={submit.bind(null, props)}/>
}

function submit(props, e){
    if(e.key === 'Enter'){
        if(e.target.value.trim() !== ''){
            props.onSubmit(e)
            $('.TodoItem input')
            $('.TodoItem').each(function(index, element){
                let idx = 'item'+index
                $(this).find('input').attr('id',idx)
                $(this).find('label').attr('for',idx)
            })
            $('.inputWrapper').hide()
        }
    }
}
function changeTitle(props, e){
    props.onChange(e)
}



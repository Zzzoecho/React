import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn} from './leanCloud'
import $ from 'jquery'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            formData: {
                username: '',
                password: '',
                email: ''
            }
        }
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    signUp(e){
        e.preventDefault()
        let {username, password, email} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
            // console.log('signUp: ' + this.state.user.id)
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已被占用')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(username, password,email, success, error)
        
    }
    signIn(e){
         e.preventDefault()
        let {username, password} = this.state.formData
        // console.log('signIn: ' + this.state.user.id)
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }
    changeFormData(key, e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))  //用JSON深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    showSignUp(){
        $('.UserDialog .panes').animate({
            left: 0,
        },300)
        .animate({
            left:35
        },200)
    }
    showLogin(){
        $('.UserDialog .panes').animate({
            left: 340,
        },300)
        .animate({
            left:318
        },200)
    }
    render() {
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}> {/*注册*/}
                <p>SIGN UP</p>
                <div className="row">
                    <label><i className="iconfont icon-email"></i></label>
                    <input type="text" placeholder="Email" value={this.state.formData.email}
                        onChange={this.changeFormData.bind(this, 'email')} />
                </div>
                <div className="row">
                    <label><i className="iconfont icon-login"></i></label>
                    <input type="text" placeholder="User Name" value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label><i className="iconfont icon-password"></i></label>
                    <input type="password" placeholder="Password" value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">SIGN UP</button>
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn" onSubmit={this.signIn.bind(this)} > {/*登录*/}
                <p>LOGIN</p>
                <div className="row">
                    <label><i className="iconfont icon-login"></i></label>
                    <input type="text" placeholder="User Name" value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-password"></i></label>
                    <input type="password" placeholder="Password" value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                </div>
            </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <link rel="stylesheet" href="https://at.alicdn.com/t/font_5afvq9evjcerk9.css"/>
                <div className="UserDialog">
                    <nav>
                        <div className="dialog up">
                            <p>Don't Have an account?</p>
                            <label>
                                <input type="radio" value="signUp" 
                                    checked={this.state.selected === 'signUp'}
                                    onChange={this.switch.bind(this)}
                                    onClick={this.showSignUp.bind(this)}
                                /> SIGN UP</label>
                        </div>
                        <div className="dialog in">
                            <p>Have an account?</p>
                            <label>
                                <input type="radio" value="signIn" 
                                    checked={this.state.selected === 'signIn'} 
                                    onChange={this.switch.bind(this)}
                                    onClick={this.showLogin.bind(this)}
                                /> LOGIN</label>
                        </div>
                        <div className="panes">
                            {this.state.selected === 'signUp' ? signUpForm : null}
                            {this.state.selected === 'signIn' ? signInForm : null}
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
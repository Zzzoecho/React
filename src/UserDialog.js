import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import $ from 'jquery'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'


export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',  //signIn
            selectedTab: 'signInOrSignUp', //forgotPassword
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
            $('.App .Todo').show()
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已被占用')
                    break
                case 200:
                    alert('用户名不能为空')
                    break
                case 201:
                    alert('密码不能为空')
                    break
                case 203:
                    alert('电子邮箱地址已经被占用')
                    break
                case 204:
                    alert('没有提供电子邮箱地址')
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
            $('.App .Todo').show()
        }
        let error = (error)=>{
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('找不到用户')
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
  
        let signInOrSignUp = (
            <div className="signInOrSignUp">
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
                        {this.state.selected === 'signUp' ? 
                            <SignUpForm formData={this.state.formData}
                                onSubmit={this.signUp.bind(this)}
                                onChange={this.changeFormData.bind(this)} 
                            />
                            : null}
                        {this.state.selected === 'signIn' ? 
                            <SignInForm formData={this.state.formData}
                                onChange={this.changeFormData.bind(this)}
                                onSubmit={this.signIn.bind(this)}
                                onForgotPassword={this.showForgotPassword.bind(this)} 
                            />
                            : null}
                    </div>
                </nav>
            </div>
        )
        let forgotPassword = (
            <div className="forgotPassword">
                <h3>Reset your password</h3>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}>
                    <div className="row">
                        <label><i className="iconfont icon-email2"></i></label>
                        <input type="text" placeholder="enter your email address" value={this.state.formData.email}
                            onChange={this.changeFormData.bind(this, 'email')} />
                    </div>
                    <div className="row actions">
                        <button tyoe="submit">Submit</button>
                        <span>or</span>
                        <a href="#" onClick={this.returnToSignIn.bind(this)}>Return to Login</a>
                    </div>
                </form>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <link rel="stylesheet" href="https://at.alicdn.com/t/font_58snzvn4qatqehfr.css"/>
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
                </div>
            </div>
        )
    }
    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e ){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
}
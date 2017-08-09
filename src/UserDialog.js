import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail, TodoModel} from './leanCloud'
import $ from 'jquery'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPasswordForm'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp', //forgotPassword
            formData: {
                email:'',
                username: '',
                password: ''
            }
        }
    }

    signUp(e){
        e.preventDefault()
        let {email, username, password} = this.state.formData
        if(!this.checkInfo.call(this, email, username, password)){
            return
        }
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
        signUp(email, username, password, success, error)
        
    }
    signIn(e){
         e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
            TodoModel.update()
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
    checkInfo(email, username, password){
        let regEmail = /\w+@/
        let regUsername = /\w{3,}/
        let regPassWord = /.{6,}/

        if(!regEmail.test(email)){
            alert('邮箱必须包含@')
            return false
        }else if (!regUsername.test(username)){
            alert('用户名不能少于三位')
            return false
        }else if(!regPassWord.test(password)){
            alert('密码不能少于六位')
            return false
        }
        return true
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
  
        return (
            <div className="UserDialog-Wrapper">
                <link rel="stylesheet" href="https://at.alicdn.com/t/font_58snzvn4qatqehfr.css"/>
                <div className="UserDialog">
                    {
                        this.state.selectedTab === 'signInOrSignUp' ? 
                        <SignInOrSignUp
                            formData={this.state.formData}
                            onSignIn={this.signIn.bind(this)}    
                            onSignUp={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onShowSignUp={this.showSignUp.bind(this)}
                            onShowLogin={this.showLogin.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                        /> : 
                        <ForgotPasswordForm
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}
                        />
                    }
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
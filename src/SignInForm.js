import React, { Component } from 'react';

export default class SignInForm  extends Component {
    render(){
        return(
            <form className="signIn" onSubmit={this.props.onSubmit} > {/*登录*/}
                <p>LOG IN</p>
                <div className="row">
                    <label><i className="iconfont icon-login"></i></label>
                    <input type="text" placeholder="User Name" value={this.props.formData.username}
                        onChange={this.props.onChange.bind(null, 'username')}/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-password"></i></label>
                    <input type="password" placeholder="Password" value={this.props.formData.password}
                        onChange={this.props.onChange.bind(null, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">LOG IN</button>
                    <a href="#" onClick={this.props.onForgotPassword}>Forgot Password?</a>
                </div>
            </form>
        )
    }
}
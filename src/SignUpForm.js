import React, { Component } from 'react';

export default class SignUpForm extends Component {
    render(){
        return(
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
    }
}
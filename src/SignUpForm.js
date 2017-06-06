import React, { Component } from 'react';

export default class SignUpForm extends Component {
    render(){
        return(
            <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/*注册*/}
                <p>SIGN UP</p>
                <div className="row">
                    <label><i className="iconfont icon-email"></i></label>
                    <input type="text" placeholder="Email" value={this.props.formData.email}
                        onChange={this.props.onChange.bind(this, 'email')} />
                </div>
                <div className="row">
                    <label><i className="iconfont icon-login"></i></label>
                    <input type="text" placeholder="User Name" value={this.props.formData.username}
                        onChange={this.props.onChange.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label><i className="iconfont icon-password"></i></label>
                    <input type="password" placeholder="Password" value={this.props.formData.password}
                        onChange={this.props.onChange.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">SIGN UP</button>
                </div>
            </form>
        )
    }
}
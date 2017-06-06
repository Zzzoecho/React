import React, { Component } from 'react';

export default class ForgotPasswordForm extends Component {
    render(){
        return(
            <div className="forgotPassword">
                <h3>Reset your password</h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <label><i className="iconfont icon-email2"></i></label>
                        <input type="text" placeholder="enter your email address" value={this.props.formData.email}
                            onChange={this.props.onChange.bind(null, 'email')} />
                    </div>
                    <div className="row actions">
                        <button tyoe="submit">Submit</button>
                        <span>or</span>
                        <a href="#" onClick={this.props.onSignIn}>Return to Login</a>
                    </div>
                </form>
            </div>
        )
    }
}
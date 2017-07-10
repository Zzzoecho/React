import React, { Component } from 'react';

export default class ForgotPasswordForm extends Component {
    render(){
        return(
            <div className="forgotPassword">
                <h3>重置密码</h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <label><i className="iconfont icon-email2"></i></label>
                        <input type="text" placeholder="输入你的电子邮箱地址" value={this.props.formData.email}
                            onChange={this.props.onChange.bind(null, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type="submit">提交</button>
                        <span>or</span>
                        <a href="#" onClick={this.props.onSignIn}>返回登录</a>
                    </div>
                </form>
            </div>
        )
    }
}
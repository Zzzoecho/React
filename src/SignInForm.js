import React from 'react';

export default function (props) {
    return(
        <form className="signIn" onSubmit={props.onSubmit} > {/*登录*/}
            <p>LOG IN</p>
            <div className="row">
                <label><i className="iconfont icon-login"></i></label>
                <input type="text" placeholder="User Name" value={props.formData.username}
                    onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <label><i className="iconfont icon-password"></i></label>
                <input type="password" placeholder="Password" value={props.formData.password}
                    onChange={props.onChange.bind(null, 'password')} />
            </div>
            <div className="row actions">
                <button type="submit">LOG IN</button>
                <a href="#" onClick={props.onForgotPassword}>Forgot Password?</a>
            </div>
        </form>
    )
}
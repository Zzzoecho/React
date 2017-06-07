import React from 'react';

export default function (props) {
    return(
        <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/*注册*/}
            <p>SIGN UP</p>
            <div className="row">
                <label><i className="iconfont icon-email"></i></label>
                <input type="text" placeholder="Email" value={props.formData.email}
                    onChange={props.onChange.bind(null, 'email')} />
            </div>
            <div className="row">
                <label><i className="iconfont icon-login"></i></label>
                <input type="text" placeholder="User Name" value={props.formData.username}
                    onChange={props.onChange.bind(null, 'username')} />
            </div>
            <div className="row">
                <label><i className="iconfont icon-password"></i></label>
                <input type="password" placeholder="Password" value={props.formData.password}
                    onChange={props.onChange.bind(null, 'password')} />
            </div>
            <div className="row actions">
                <button type="submit">SIGN UP</button>
            </div>
        </form>
    )
}
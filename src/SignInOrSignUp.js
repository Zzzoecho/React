import React, { Component } from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class SignInOrSignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp'
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        return(
            <div className="signInOrSignUp">
                <nav>
                    <div className="dialog up">
                        <p>Don't Have an account?</p>
                        <label>
                            <input type="radio" value="signUp" 
                                checked={this.state.selected === 'signUp'}
                                onChange={this.switch.bind(this)}
                                onClick={this.props.onShowSignUp}
                            /> SIGN UP</label>
                    </div>
                    <div className="dialog in">
                        <p>Have an account?</p>
                        <label>
                            <input type="radio" value="signIn" 
                                checked={this.state.selected === 'signIn'} 
                                onChange={this.switch.bind(this)}
                                onClick={this.props.onShowLogin}
                            /> LOGIN</label>
                    </div>
                    <div className="panes">
                        {this.state.selected === 'signUp' ? 
                            <SignUpForm formData={this.props.formData}
                                onSubmit={this.props.onSignUp}
                                onChange={this.props.onChange} 
                            />
                            : null}
                        {this.state.selected === 'signIn' ? 
                            <SignInForm formData={this.props.formData}
                                onChange={this.props.onChange}
                                onSubmit={this.props.onSignIn}
                                onForgotPassword={this.props.onForgotPassword} 
                            />
                            : null}
                    </div>
                </nav>
            </div>
        )
    }
}
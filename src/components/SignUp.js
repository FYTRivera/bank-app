import React, {useState, useRef} from "react";
import LoginForm from "./LoginForm";

function SignUp(props){

const signUp=props.signUp
const accountName = useRef();
const accountEmail = useRef();
const accountPassword = useRef();
const accountNumber = useRef();
// const [signingUp, setSigningUp]=useState(props.signup)
console.log(props.otherUsersProps)
// const register = () =>{
//     console.log(signingUp)
//     signUp()
// }

function SignUp(e){
    if(accountName.current.value!=='') {
        props.setSigningUp(false)}
    console.log(e.target.value)
    props.setOtherUsersProps([...props.otherUsersProps, 
        {name: accountName.current.value,
        email: accountEmail.current.value,
        password: accountPassword.current.value,
        number: accountNumber.current.value
        }])
}

function Cancel(e){
    props.setSigningUp(false)
}

    return(
        <>
        <div className="form-outer">
            <div className="form-header">
                <img className='logo' src='\assets\images\avion-logo.png' alt='Avion Logo'/>
            </div>
            <div className="form-inner">
                <div className="form-group">
                    <h2>Create an AvionBank Account!</h2>
                </div>
                <div className="form-group">
                    <input required ref={accountName} placeholder='Name...' type='text' name='name' className='input-box' id='name'/>
                </div>
                <div className="form-group">
                    <input required ref={accountEmail} placeholder='E-mail...' type='email' name='email' className='input-box' id='email'/>
                </div>
                <div className="form-group">
                    <input required ref={accountPassword} placeholder='Password...' type='password' name='password' className='input-box' id='password'/>
                </div>
                <div className="form-group">
                    <input required ref={accountNumber} placeholder='Account Number...' type='number' name='number' className='input-box' id='number'/>
                </div>
                <div className="form-group">
                    <input className='login-button' type='submit' onClick={e=>SignUp(e)} value='Register' />
                </div>
                <div className="form-group">
                    <input type='submit' onClick={e=>Cancel(e)} value='Cancel' />
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp;
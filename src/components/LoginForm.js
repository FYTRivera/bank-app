import React, {useState} from 'react'
import SignUp from './SignUp';



function LoginForm(props) {
    const [details, setDetails] = useState({name:"", email: "", password: ""})
    const [signingUp, setSigningUp] = useState(false)
    

    // console.log(props.otherUsers)

function onSigningUp(){
    setSigningUp(true)
    console.log(signingUp)
}

function onSignUp(){
    setSigningUp(false)
}

const submitHandler = e => {
    e.preventDefault();

    props.login(details);
}

    return(
        <div className="login-form">
        {signingUp? <SignUp signUp={signingUp} setSigningUp={setSigningUp} otherUsersProps={props.otherUsers} setOtherUsersProps={props.setOtherUsers}/>
        // <><p>Sign Up</p><button onClick={onSignUp}>Register</button></>
        :
            <form onSubmit={submitHandler}>
                <div className="form-outer">
                    <div className="form-header">
                        <img className='logo' src='\assets\images\avion-logo.png' alt='Avion Logo'/>
                    </div>
                    <div className="form-inner">
                        <div className="form-group">
                            <h2>Log in to AvionBank</h2>
                        </div>
                        {(props.error!="")?(<div className="error">{props.error}</div>): ""}
                        <div className="form-group">
                            <input required placeholder='Name...' type='text' name='name' className='input-box' id='name' onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                        </div>
                        <div className="form-group">
                            <input required placeholder='E-mail...' type='email' name='email' className='input-box' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                        </div>
                        {/* <div className="form-group">
                            <input placeholder='Account Number...' type='number' name='number' className='input-box' id='number' onChange={e => setDetails({...details, number: e.target.value})} value={details.number}/>
                        </div> */}
                        <div className="form-group">
                            <input required placeholder='Password...' type='password' name='password' className='input-box' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                        </div>
                        <div className="form-group">
                            <input className='login-button' type='submit' value='LOGIN' />
                        </div>
                        <p>New user? Sign up <button type="button" onClick={onSigningUp}>here!</button></p>
                    </div>
                </div>
            </form>
        }
        </div>
    )
}

export default LoginForm
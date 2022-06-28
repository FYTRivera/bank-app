import React, {useState} from 'react'

function LoginForm({ login, error }) {
    const [details, setDetails] = useState({name:"", email: "", password: ""})

const submitHandler = e => {
    e.preventDefault();

    login(details);
}

    return(
        <form onSubmit={submitHandler}>
            <div className="form-outer">
                <div className="form-header">
                    <img className='logo' src='\assets\images\avion-logo.png' alt='Avion Logo'/>
                </div>
                <div className="form-inner">
                    <div className="form-group">
                        <h2>Log in to AvionBank</h2>
                    </div>
                    {(error!="")?(<div className="error">{error}</div>): ""}
                    <div className="form-group">
                        <input placeholder='Name...' type='text' name='name' className='input-box' id='name' onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                    </div>
                    <div className="form-group">
                        <input placeholder='E-mail...' type='email' name='email' className='input-box' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                    </div>
                    <div className="form-group">
                        <input placeholder='Password...' type='password' name='password' className='input-box' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    </div>
                    <div className="form-group">
                        <input className='login-button' type='submit' value='LOGIN' />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import AccountBalance from './components/AccountBalance';
import ExpenseList from './components/ExpenseList';

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name:"", email: ""});
  const [error, setError] = useState("");

  // let initialBalance = Number(window.localStorage.getItem('accountBalance'))
  // const [endBalance, setEndBalance] = useState(Number(initialBalance))
  // const [increment, setIncrement] = useState(0);
  
  const onLogin = details => {
    console.log(details);

    if (details.email === adminUser.email && details.password === adminUser.password){
      console.log('logged in')
      setUser({
        name: details.name,
        email: details.email
      })
    }

    else{
      console.log('details dont match')
      setError("details dont match")
    }
  }

  const onLogout = () => {
    console.log("logged out")
    setUser({name:"", email: ""})
  }
  
  return (
    <div className="App">
      {(user.email != "") ? (
        <>
        <div className="form-outer">
          <div className="main-page-header">
              <img className='logo' src='\assets\images\avion-logo.png' alt='Avion Logo'/>
              <h2 className='welcoming-message'>Welcome, <span>{user.name}</span>!</h2>
              <button className="logout-button" onClick={onLogout}>Logout</button>
          </div>
        <div className="main-page">
        <AccountBalance />
        </div>
        </div>
        </>
      ) : (
       <LoginForm login={onLogin} error={error}/>
      )}
    </div>
  );
}

export default App;

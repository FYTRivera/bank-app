import './App.css';
import React, {useState, useEffect} from 'react';
import LoginForm from './components/LoginForm';
import AccountBalance from './components/AccountBalance';
import ExpenseList from './components/ExpenseList';
import SignUp from './components/SignUp';

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
    number: "12345"
  }

  const [otherUsers, setOtherUsers] = useState(JSON.parse(window.localStorage.getItem('otherUsers')) || [])
  const [accountBalances, setAccountBalances] = useState((otherUsers.map(mail=>mail.email)) || [])
  // console.log(accountBalances)
  // console.log(otherUsers)

  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')) || {});
  const [error, setError] = useState("");

  window.localStorage.setItem('user', JSON.stringify(user));
  window.localStorage.setItem('otherUsers', JSON.stringify(otherUsers));
  window.localStorage.setItem('accountBalances', JSON.stringify(accountBalances));
  
  const onLogin = details => {
    
    const originIndex = otherUsers.findIndex(e => (e.email===details.email))
    if ((details.email === adminUser.email && details.password === adminUser.password)||(otherUsers.some(e => (e.email === details.email && e.password=== details.password)))){
      console.log('logged in')
      
      setUser({
        name: details.name,
        email: details.email,
        number: otherUsers[originIndex].number,
        balance: otherUsers[originIndex].balance
      })
      setError("")
      
    }

    else{
      // console.log('User does not exist.')
      setError("User does not exist.")
      console.log(otherUsers)
      console.log(otherUsers.findIndex(e => (e.email===details.email)))
    }
  }

  const onLogout = () => {
    console.log("logged out")
    setUser({name:"", email: "", number: "", balance: ""})
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
        <AccountBalance user={user} setUser={setUser} accountBalances={accountBalances} setAccountBalances={setAccountBalances} otherUsers={otherUsers} setOtherUsers={setOtherUsers} />
        </div>
        </div>
        </>
      ) : (
       <LoginForm login={onLogin} error={error} otherUsers={otherUsers} setOtherUsers={setOtherUsers} />
      )}
    </div>
  );
}

export default App;

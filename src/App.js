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
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span>!</h2>
          <button onClick={onLogout}>Logout</button>
        </div>
        <AccountBalance /></>
      ) : (
       <LoginForm login={onLogin} error={error}/>
      )}
    </div>
  );
}

export default App;

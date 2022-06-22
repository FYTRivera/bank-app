import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name:"", email: ""});
  const [error, setError] = useState("");
  
  const Login = props => {
    console.log(props);

    if (props.email === adminUser.email && props.password === adminUser.password){
      console.log('logged in')
      setUser({
        name: props.name,
        email: props.email
      })
    }

    else{
      console.log('details dont match')
      setError("details dont match")
    }
  }

  const Logout = () => {
    console.log("logged out")
    setUser({name:"", email: ""})
  }
  
  return (
    <div className="App">
      {(user.email != "") ? (
        <div className = "welcome">
          <h2>welcome <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
       <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;

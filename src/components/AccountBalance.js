import React, { useState, useEffect, useRef } from "react";

function AccountBalance(){
    let initialBalance = Number(window.localStorage.getItem('accountBalance'))
    const [increment, setIncrement] = useState(0);
    //let endBalance = Number(initialBalance) + Number(increment)
    const positiveIncrement = useRef()
    const negativeIncrement = useRef()
    const [endBalance, setEndBalance] = useState(Number(initialBalance))
    
    

    const submitHandler = e => {
        e.preventDefault();
    }

function addMoney(e){
    console.log(positiveIncrement.current.value)
    setEndBalance(Number(endBalance) + Number(positiveIncrement.current.value))
    console.log(e.target)
}

function takeMoney(){
    setEndBalance(Number(endBalance) - Number(negativeIncrement.current.value))
}

useEffect(() => {
  window.localStorage.setItem('accountBalance', endBalance);
  window.localStorage.setItem('increment', increment);
});

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                        <label htmlFor='number'>Deposit: </label>
                        <input ref={positiveIncrement} type='number' name='deposit' id='deposit' onChange={e => setIncrement(e.target.value)} />
                        <button onClick={addMoney}>Deposit</button>
                </div>
                <div>
                        <label htmlFor='number'>Withdraw: </label>
                        <input ref={negativeIncrement} type='number' name='withdraw' id='withdraw' onChange={e => setIncrement(e.target.value)} />
                        <button onClick={takeMoney}>Withdraw</button>
                </div>
            </form>
            <h1>Account Balance: {endBalance}</h1>
        </div>
        
    )
}

export default AccountBalance
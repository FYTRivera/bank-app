import React, { useState, useEffect, useRef } from "react";
import ExpenseList from "./ExpenseList";

function AccountBalance(){
    let initialBalance = Number(window.localStorage.getItem('accountBalance'))
    const [endBalance, setEndBalance] = useState(Number(initialBalance))
    const [increment, setIncrement] = useState(0);
    //let endBalance = Number(initialBalance) + Number(increment)
    const positiveIncrement = useRef()
    const negativeIncrement = useRef()
    const [test, setTest] = useState([])
    const [test2, setTest2] = useState([])
    
    const expenseName = useRef()
    const expenseCost = useRef()

    const removeButton = useRef()

    const submitHandler = e => {
        e.preventDefault();
    }

    function testAddFunction () {
        const testObject = {
            name: expenseName.current.value,
            cost: expenseCost.current.value
        }
        const isOnTheList = test2.includes(expenseName.current.value)
        if(isOnTheList){
            console.log('item is already in the list')
        }
        else{
            setTest([...test, {
                // id: test.length,
                name: expenseName.current.value,
                cost: expenseCost.current.value
            }])
            setTest2([...test2, expenseName.current.value])
            setEndBalance(Number(endBalance) - Number(expenseCost.current.value))
        }
        // console.log(test2.includes(expenseName.current.value))
        // console.log(test2)
    }

    function testRemoveFunction (e) {
        const name = e.target.parentElement.getAttribute('name')
        const cost = e.target.parentElement.getAttribute('cost')
        setTest(test.filter(test=> test.name !== name))
        setTest2(test2.filter(item=> item !== name))
        setEndBalance(Number(endBalance) + Number(cost))
        // console.log(e.target.parentElement.getAttribute('name'))
    }

function addMoney(){
    setEndBalance(Number(endBalance) + Number(positiveIncrement.current.value))
}

function takeMoney(){
    setEndBalance(Number(endBalance) - Number(negativeIncrement.current.value))
}

useEffect(() => {
  window.localStorage.setItem('accountBalance', endBalance);
  window.localStorage.setItem('increment', increment);
});

    return(
    <>
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
        </div>
        <div>
            <ExpenseList balance={endBalance}/>
        </div>
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Expense Name:</label>
                    <input type="text" ref={expenseName}></input>
                </div>
                <div>
                    <label>Expense Cost:</label>
                    <input type="number" ref={expenseCost}></input>
                </div>
                <button type="submit" onClick={testAddFunction}>add to test array</button>
                <ul>
                    {test.map((item, index) => (<li cost={item.cost} name={item.name} ref={removeButton} key={index}>{item.name} | {item.cost} | 
                        <button onClick={testRemoveFunction}>delete</button>
                        <button onClick={()=>console.log(item)}>check</button></li>))}
                </ul>
            </form>
        </div>
    </>
    )
}

export default AccountBalance

import React, { useState, useEffect, useRef } from "react";
import ExpenseList from "./ExpenseList";

function AccountBalance(){
    let initialBalance = Number(window.localStorage.getItem('accountBalance'))
    const [endBalance, setEndBalance] = useState(Number(initialBalance))
    const [increment, setIncrement] = useState(0);
    //let endBalance = Number(initialBalance) + Number(increment)
    const positiveIncrement = useRef()
    const negativeIncrement = useRef()
    const [test, setTest] = useState(JSON.parse(window.localStorage.getItem('test')) || [])
    const [test2, setTest2] = useState(JSON.parse(window.localStorage.getItem('test2')) || [])
    const [placeholder, setPlaceholder] = useState('')
    
    const expenseName = useRef()
    const expenseCost = useRef()

    const removeButton = useRef()

    const submitHandler = e => {
        e.preventDefault();
    }

    function testAddFunction () {
        const isOnTheList = test2.includes(expenseName.current.value)
        if(isOnTheList){
            console.log('item is already in the list')
            console.log(test2)
        }
        else{
            setTest([...test, {
                id: test.length,
                name: expenseName.current.value,
                cost: expenseCost.current.value
            }])
            setTest2([...test2, expenseName.current.value])
            setEndBalance(Number(endBalance) - Number(expenseCost.current.value))
        }
        // console.log(test2.includes(expenseName.current.value))
    }

    function testEditFunction(e){
        
    }

    function testRemoveFunction (e) {
        const name = e.target.parentElement.getAttribute('name')
        const cost = e.target.parentElement.getAttribute('cost')
        setTest(test.filter(test=> test.name !== name))
        setTest2(test2.filter(item=> item !== name))
        setEndBalance(Number(endBalance) + Number(cost))
        // console.log(e.target.parentElement.getAttribute('name'))
    }

    function nameUpdateFunction (text, name) {
        const updatedTest = test.map(item=>{
            if(item.name===name){
                return {...item, name: text};
            }

            // return {...item, name: item.name};
            return item;
        })

        const updatedTest2 = test2.map(item=>{
            if(item===name){
                return text;
            }
            return item;
        })

        console.log('updated test', updatedTest)
        console.log('updated test 2', updatedTest2)
        setTest(updatedTest)
        setTest2(updatedTest2)
    }

    function costUpdateFunction (cost, name, itemCost) {
        console.log('itemCost', itemCost)
        console.log('cost', cost)
        const updatedTest = test.map(item=>{
            if(item.name===name){
                return {...item, cost: cost};
            }

            // return {...item, name: item.name};
            return item;
        })

        setEndBalance(Number(endBalance) + Number(itemCost) - Number(cost))
        console.log(updatedTest)
        setTest(updatedTest)
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
  window.localStorage.setItem('test', JSON.stringify(test));
  window.localStorage.setItem('test2', JSON.stringify(test2));
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
                <button type="submit" onClick={testAddFunction}>Add to Expense List</button>
                <ul>
                    {test.map((item, index) => (<li cost={item.cost} name={item.name} ref={removeButton} key={index}>
                        <input type='text' value={item.name} onChange={e=>nameUpdateFunction(e.target.value, item.name)} /> | 
                        <input type='number' value={item.cost} onChange={e=>costUpdateFunction(e.target.value, item.name, item.cost)} /> | 
                        <button onClick={testEditFunction}>Update</button> | 
                        <button onClick={testRemoveFunction}>Delete</button>
                        </li>))}
                </ul>
            </form>
        </div>
    </>
    )
}

export default AccountBalance

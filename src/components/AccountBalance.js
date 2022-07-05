import React, { useState, useEffect, useRef } from "react";
import ExpenseList from "./ExpenseList";

function AccountBalance(props){
    const user = props.user
    const userBalance = props.user.balance
    let initialBalance = Number(window.localStorage.getItem('accountBalance'))

    // console.log(props.accountBalances)
    const originIndex = props.accountBalances.findIndex(e=>e===props.user.email)
    // console.log(props.accountBalances.findIndex(e=>e===props.user.balance))
    // console.log(originIndex)
    const [endBalance, setEndBalance] = useState(Number(props.otherUsers[originIndex].balance))
    const balanceHolder = endBalance

    const [increment, setIncrement] = useState(0);
    //let endBalance = Number(initialBalance) + Number(increment)
    const positiveIncrement = useRef()
    const negativeIncrement = useRef()
    const transferIncrement = useRef()
    const transferNumber = useRef()
    const [test, setTest] = useState(JSON.parse(window.localStorage.getItem('test')) || [])
    const [test2, setTest2] = useState(JSON.parse(window.localStorage.getItem('test2')) || [])
    
    const expenseName = useRef()
    const expenseCost = useRef()

    const removeButton = useRef()

    const submitHandler = e => {
        e.preventDefault();
    }

    // console.log(user)

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
        expenseName.current.value=''
        expenseCost.current.value=''
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
    positiveIncrement.current.value=''
    console.log(user)
    
    props.setOtherUsers(props.otherUsers.map(item=>{
        if(item.email===user.email){
            console.log('item email',item.email)
            console.log("user email",user.email)
            return {...item, balance: balanceHolder};
        }
        return item;
        }
    ))
    console.log(props.otherUsers)
}

function takeMoney(){
    setEndBalance(Number(endBalance) - Number(negativeIncrement.current.value))
    negativeIncrement.current.value=''

    props.setOtherUsers(props.otherUsers.map(item=>{
        if(item.email===user.email){
            console.log('item email',item.email)
            console.log("user email",user.email)
            return {...item, balance: balanceHolder};
        }
        return item;
        }
    ))
}

function transferMoney(){
    setEndBalance(Number(endBalance) - Number(transferIncrement.current.value))
    transferNumber.current.value=''
    transferIncrement.current.value=''

    props.setOtherUsers(props.otherUsers.map(item=>{
        if(item.email===user.email){
            console.log('item email',item.email)
            console.log("user email",user.email)
            return {...item, balance: balanceHolder};
        }
        return item;
        }
    ))
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
                <div className="accountBalanceTest">
                    <p>Account Name: <b>{user.name}</b></p>
                    <p>Account Number: <b>{user.number}</b></p>
                </div>
                <div>
                    <ExpenseList balance={endBalance}/>
                </div>
                <div className='accountBalanceTest'>
                    <div className="form-inner">
                        <label htmlFor='number'>Deposit: </label>
                        <input ref={positiveIncrement} step=".01" type='number' name='deposit' id='deposit' placeholder='Input deposit amount...' className='input-box' onChange={e => setIncrement(e.target.value)} />
                        <button className='logout-button' onClick={addMoney}>Deposit</button>
                    </div>
                    <div className="form-inner">
                        <label htmlFor='number'>Withdraw: </label>
                        <input ref={negativeIncrement} step=".01" type='number' name='withdraw' id='withdraw' placeholder='Input withdraw amount...' className='input-box' onChange={e => setIncrement(e.target.value)} />
                        <button className='logout-button' onClick={takeMoney}>Withdraw</button>
                    </div>
                </div>
                <div className="form-inner">
                        <h3>Transfer to Another Account </h3>
                        <label htmlFor='transferNumber'>Transfer to Account Number: </label>
                        <input ref={transferNumber} type='number' name='transferNumber' id='transferNumber' placeholder='Input account number to transfer to...' className='input-box' />
                        <label htmlFor='transfer'>Transfer Amount: </label>
                        <input ref={transferIncrement} step=".01" type='number' name='transfer' id='transfer' placeholder='Input transfer amount...' className='input-box' onChange={e => setIncrement(e.target.value)} />
                        <button className='logout-button' onClick={transferMoney}>Transfer</button>
                    </div>
            </form>
        </div>
        <div>
        <div>
            <h3>Expense List</h3>
        </div>
            <form onSubmit={submitHandler}>
                <div className="accountBalanceTest">
                    <div className="form-inner">
                    <label>Expense Name:</label>
                    <input className="input-box" placeholder="Input expense name..." type="text" ref={expenseName}></input>
                    </div>
                    <div className="form-inner">
                    <label>Expense Cost:</label>
                    <input className="input-box" placeholder="Input expense cost..." type="number" ref={expenseCost}></input>
                    </div>                
                </div>
                <button className='normal-button' type="submit" onClick={testAddFunction}>Add to Expense List</button>
                <ul>
                    {test.map((item, index) => (<li cost={item.cost} name={item.name} ref={removeButton} key={index}>
                        <input type='text' value={item.name} onChange={e=>nameUpdateFunction(e.target.value, item.name)} /> | 
                        <input type='number' value={item.cost} onChange={e=>costUpdateFunction(e.target.value, item.name, item.cost)} /> |  
                        <button onClick={testRemoveFunction}>Delete</button>
                        </li>))}
                </ul>
            </form>
        </div>
    </>
    )
}

export default AccountBalance

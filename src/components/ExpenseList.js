import React, { useState, useEffect, useRef } from "react";


function ExpenseList(props){

    const balance = Number(props.balance)

    return(
        <>
        <div className="center-div">
            <div className="balanceNumber">
                <h1>₱{balance.toFixed(2)}</h1>
            </div>
            <h2>Account Balance</h2>
        </div>
        </>
    )
}


export default ExpenseList

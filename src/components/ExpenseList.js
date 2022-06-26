import React, { useState, useEffect, useRef } from "react";


function ExpenseList(props){

    const balance = Number(props.balance)

    return(
        <label htmlFor='expense'>Balance: {balance}</label>
    )
}


export default ExpenseList

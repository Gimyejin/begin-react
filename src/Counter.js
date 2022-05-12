import React, {useState, useReducer} from 'react';

function reducer(state,action){
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;    
        default:
            return state;
    }
}

function Counter(){
    const [number, dispatch] = useReducer(reducer,0);//초기 state는 0
    const increase = () =>{
        dispatch({type:'INCREMENT'})
    } 
    const decrease = () =>{
        dispatch({type:'DECREMENT'})
    } 
 return(
     <div>
        <h1>number</h1>
        <h3>{number}</h3>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
     </div>
 )
 }
/* function Counter(){
    const [num, setNum] = useState(0);//숫자 0으로 초기화?
    const increase = () =>{
        setNum(prevNum => prevNum + 1);

    } 
    const decrease = () =>{
        setNum(prevNum => prevNum + 1);
    } 
 return(
     <div>
        <h1>number</h1>
        <h3>{num}</h3>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
     </div>
 )
} */
export default Counter;
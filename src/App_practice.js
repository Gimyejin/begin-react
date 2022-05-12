import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action){
  switch(action.type){
    case 'change':
      return{
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]:action.value
        }
      };
    case 'create':
      return{
        inputs : initialState.inputs,
        users:state.users.concat(action.user)
      };
    case 'remove':
      return{
        ...state,
        users:state.users.filter(user => user.id !== action.id)
      }
    case 'toggle':
      return{
        ...state,
        users: state.users.map(user=>user.id === action.id? {...user, active: !user.active}: user)
      }
    default:
      return{
        state
      }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer,initialState);
  //state 에서 필요한 값들을 비구조화 할당 문법을 사용하여 추출
  const nextId = useRef(4);
  const {users} = state;
  const {username,email} = state.inputs;

  const onChange = useCallback(e=>{
    const{name,value}=e.target;
    dispatch({
      type :'change',
      name, value
    });
  },[]);

  const onCreate = useCallback(()=>{
    dispatch({
      type:'create',
      user:{
        id: nextId.current,
        username,email
      }
    })
    nextId.current +=1 
  },[username,email]);

  const onRemove = useCallback(id=>{
    dispatch({
      type: 'remove',
      id
    })
  },[]);
  const onToggle = useCallback(id=>{
    dispatch({
      type:'toggle',
      id
    })
  },[]);


  const count = useMemo(()=>countActiveUsers(users),[users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList userList={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
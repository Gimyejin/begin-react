import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/userInputs';


function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
  }
  
  const initialState = {
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
  
//UserDispatch 라는 이름으로 내보내준다.
export const UserDispatch = React.createContext(null);

function App_Hook(){
    const [{ username, email }, onChange, reset] = useInputs({
        username: '',
        email: ''
    });
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;

    const onCreate = useCallback(() => {
        dispatch({
          type: 'create',
          user: {
            id: nextId.current,
            username,
            email
          }
        });
        reset();
        nextId.current += 1;
      }, [username, email, reset]);


    

  const count = useMemo(()=>countActiveUsers(users),[users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList userList={users}/>
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}
export default App_Hook;
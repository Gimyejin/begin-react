import React, { useEffect,useContext } from 'react';
import { UserDispatch } from './App_Hook';

const User = React.memo(function User({ user}) {
  const dispatch = useContext(UserDispatch);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => dispatch({type:'toggle', id:user.id})}
      >{user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => dispatch({type:'remove',id:user.id})}>삭제</button>
    </div>
  );
});

function UserList({userList}){   
    return(
        <div>
            {userList.map(user=>(
                <User key={user.id} user={user}  
                />
            ))}
        </div>
    );
}
export default React.memo(UserList);
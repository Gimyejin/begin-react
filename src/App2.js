import React,{useRef,useState,useMemo,useCallback} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중');
  return users.filter(user=>user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username:'', email:''
  });

  const {username,email}=inputs;

  const onChange = useCallback (e =>{
      const {name,value}=e.target;
      //name은 현재 내가 값을 넣은 input의 name
      //value는 input에 넣은 값
      setInputs(inputs=>({
        ...inputs,//이전에 넣은 값+ 현재 넣은 값
        //복사된 inputs에다가 새로 값을 추가한 것 => 불변성이 지켜짐.
        [name]:value
        })
      );
    },[]
  );

  const [users,setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    id =>{
      //user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      //filter(true)때는 값을 살리고, 아니면 버린다
      //setUsers(users.filter(user => user.id !== id));
      
      setUsers(users=> users.filter(user=>user.id !== id));
    },
    []
  );
  
  const onToggle = useCallback(id =>{
      setUsers(users =>
        users.map(user => 
          user.id === id?{...user, active: !user.active} : user
          )
      );
    },
    []
  );
  const count = useMemo(()=>countActiveUsers(users),[users]);
  return (
    <div>
      <Wrapper>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList userList={users}
          onRemove={onRemove}
          onToggle={onToggle}
        />
        <div>활성자 수: {count}</div>
      </Wrapper>
      <Wrapper>
        <InputSample />
      </Wrapper>
      <Wrapper>
        <Counter />
      </Wrapper>
      <Wrapper >
        <Hello name="react" color="red" isSpecial/>
        <Hello color="orange" />
      </Wrapper>
      
      
    </div>
  );
}

export default App;
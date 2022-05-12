import React,{useState,useRef} from 'react';
function InputSample(){
    const [inputs, setInputs] = useState({
        name : '',
        nick : '',
    });

    const nameInput = useRef();

    const {name, nick} = inputs;
    //비구조화 할당을 통해 값 추출

    const onChange = (e)=>{
        const{name, value}=e.target;
        //e.target에서 name과 value를 추출
        setInputs({
            ...inputs,//기존의 input객체를 복사
            [name] : value // name키를 가진 값을 value로 설정
        });
    }

    const onReset = ()=>{
        setInputs({
            name:'',nick:''
        })
        nameInput.current.focus();
    }
    return(
        <div> 
            <input name='name' placeholder='이름' onChange={onChange} value={name} ref={nameInput}/>
            <input name='nick' placeholder='닉네임' onChange={onChange} value={nick}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nick})
            </div>
        </div>
    );
}
export default InputSample;
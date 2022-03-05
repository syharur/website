import React, { useEffect, useState } from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function RegisterScreen(props) {
    
    const navigate=useNavigate();
    const [nama,setnama]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const {search}=useLocation();
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl ? redirectInUrl :'/';

    const userRegister=useSelector((state)=>state.userRegister);
    const {userInfo,loading,error}=userRegister;

    const dispatch = useDispatch()
    const submitHandler =(e) =>{
        e.preventDefault();
        // do register action
        if(password !== confirmPassword){
            alert('Password and Confirm Password are not Match')
        }else{
             dispatch(register(nama,email,password)); 
        }
       
    };
    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[navigate,redirect,userInfo]);
    
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create an Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor='nama'>Name</label>
                    <input type="text" id="nama" placeholder='Enter Name' required
                        onChange={e => setnama(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input type="email" id="email" placeholder='Enter Email' required
                        onChange={e => setEmail(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" placeholder='Enter Password' required
                        onChange={e => setPassword(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder='Enter Confirm Password' required
                        onChange={e => setConfirmPassword(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label/>
                    <button className='primary' type='submit'>
                        Register
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account ? {''}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

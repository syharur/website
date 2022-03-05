import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

    const [nama,setNama]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const userSignin=useSelector((state)=>state.userSignin);
    const {userInfo}=userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading,error,user}=userDetails;
    const userUpdateProfile=useSelector((state)=>state.userUpdateProfile);
    const {
        success:successUpdate,
        error:errorUpdate,
        loading:loadingUpdate,
    }=userUpdateProfile;

    const dispatch=useDispatch();
    useEffect(()=>{
        if(!user){
            dispatch({type:USER_UPDATE_PROFILE_RESET});
             dispatch(detailsUser(userInfo._id));
        }else {
            setNama(user.nama);
            setEmail(user.email);
        }
       
    },[dispatch,userInfo._id,user]);
    
    const submitHandler=(e)=>{
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword){
            alert ('Password and Confirm Password are not Match')
        }else{
            dispatch(updateUserProfile({userId:user._id,nama,email,password}));
        }
    }
    return (
        <div>
                <form className='form' onSubmit={submitHandler}>
                    <div>
                        <h1>User Profile</h1>
                    </div>
                    {
                        loading ? ( <LoadingBox></LoadingBox>
                        ): error ? ( <MessageBox variant="danger">{error}</MessageBox>
                        ):(
                        <>
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && (
                                <MessageBox variant="danger">{errorUpdate}</MessageBox>
                            )}
                            {successUpdate && (
                                <MessageBox variant="success">
                                    Profile Update Success
                                </MessageBox>
                            )}
                            <div>
                                <label htmlFor='nama'>Name</label>
                                <input 
                                    id='nama' 
                                    type='text' 
                                    placeholder='Enter Name' 
                                    value={nama}
                                    onChange={(e)=>setNama(e.target.value)}
                                ></input>    
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input 
                                    id='email' 
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                ></input>    
                            </div>
                            <div>
                                <label htmlFor='Password'>Password</label>
                                <input 
                                    id='Password' 
                                    type='password' 
                                    placeholder='Enter Password' 
                                    onChange={(e)=>setPassword(e.target.value)}
                                ></input>    
                            </div>
                            <div>
                                <label htmlFor='consfirmPassword'>Confirm Password</label>
                                <input 
                                    id='consfirmPassword' 
                                    type='password' 
                                    placeholder='Enter Confirm Password' 
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                ></input>    
                            </div>
                            <div>
                                <label/>
                                <button className='primary' type='submit'>
                                    Update
                                </button>    
                            </div>
                        </>
                        )}
                </form>    
        </div>
    )
}

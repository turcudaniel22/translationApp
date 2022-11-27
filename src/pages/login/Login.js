import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { addUser, GetUsers } from '../../actionsTypes/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import loginRobot from '../../assets/loginRobot.png'

const Login = () => {
  const [userInputValue, setuserInputValue] = useState('')
  const Navigater = useNavigate()
  const { data } = useSelector((state) => state.userReducer.users)
  const AddUserData = useSelector((state) => state.userReducer.addUser)

  const dispatch = useDispatch()
  const UserName = localStorage.getItem('user')
  //  IF user login to naviagte to translations
  useEffect(() => {
    if (AddUserData.data) {
      Navigater('/translations')
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AddUserData])
  // Get all user
  useEffect(() => {
    dispatch(GetUsers())
  }, [])
  // if User already login navigate to translations
  useEffect(() => {
    if (UserName) {
      Navigater('/translations')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserName])
  //Create_New_ User_Function
  const CreateNewUser = async () => {
    if (!userInputValue) {
      toast.error('Please provide a username.')
      return
    }
    const res = data.filter((val) => {
      return val.username === userInputValue
    })
    if (res.length > 0) {
      localStorage.setItem('user', userInputValue)
      Navigater('/translations')
      setuserInputValue('')
      return
    } else {
      dispatch(addUser(userInputValue))
    }
  }
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <div className='mainTranslate'>
        <div className='nabBar1'>
          {' '}
          <h1>Lost in Translate</h1>
        </div>
        <div className='secMain'>
          <div className='left'>
            <div className='imageDiv'>
              <img className='img1' src={loginRobot} alt='' />
            </div>
          </div>
          <div className='right'>
            <form
              onSubmit={(e) => {
                CreateNewUser()
                e.preventDefault()
              }}
              className='inputMain'
            >
              <input
                className='nameInput'
                type='text'
                value={userInputValue}
                onChange={(e) => setuserInputValue(e.target.value)}
                placeholder='Enter your name'
              />
              <button className='icon'>
                <ArrowCircleRightIcon className='arrowIcon' />
              </button>
            </form>
          </div>
        </div>
        <div className='footerMain'></div>
      </div>
    </>
  )
}

export default Login

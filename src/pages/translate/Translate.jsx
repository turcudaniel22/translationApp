import React, { useEffect, useState } from 'react'
import './translate.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserData, Logout, UpdateUser } from '../../actionsTypes/userAction'
import { useNavigate } from 'react-router-dom'
import getList from './list'

const alphabetList = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

const Translate = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((stata) => stata.userReducer.userData)
  const [translation, setTranslation] = useState('')
  const [signsList, setSignList] = useState([])
  const UserName = localStorage.getItem('user')
  const [InputValue, setInputValue] = useState('')
  const [shake, setShake] = useState(false)
  useEffect(() => {
    dispatch(GetUserData(UserName))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserName])
  const Navigator = useNavigate()
  useEffect(() => {
    if (translation.length === 0) {
      setSignList([])
    }
  }, [translation])


  const getTranslation = () => {
    if (translation) {
      data.translate.push(translation)
      dispatch(UpdateUser(data))
    } else {
      return
    }
  }

  const filterTranslations = (e) => { 
    e.preventDefault()
    let listArray = []
    setSignList([])
    const updatedString = InputValue
    updatedString.split('').map((alphabet) => {
      const index = alphabetList.findIndex(
        (alpha) => alpha.toLocaleLowerCase() === alphabet.toLocaleLowerCase()
      )
      return listArray.push(getList()[index])
    })
    setSignList(listArray)
    setTranslation(InputValue)
    getTranslation()
  }
    
  const animate = () => {
        
    // Button begins to shake
    setShake(true);
    
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake(false), 2000);
    
}
  return (
    <>
      <div>
        <div className='navBar'>
          <div className='txtIConDiv'>
            <h1>Lost in Translate</h1>
            <div className='navIcon'>
              <p>{localStorage.getItem('user')}</p>
              <img
                src={
                  'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png'
                }
                width={'auto'}
                className='minilogo'
                alt='logo'
                height={60}
                onClick={() => Navigator('/profile')}
              />
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('user')
                Navigator('/')
                dispatch(Logout())
              }}
              className='btnLogout'
            >
              LogOut
            </button>
          </div>
        </div>
        <div className='secMain'>
          <div className='right'>
            <form
              onSubmit={(e) => {
                filterTranslations(e)
              }}
              className='translateBox slide-right'
            >
              <div className='transHedMain'>
                <div className='heading'>
                  <h1>Translate page</h1>
                </div>

                <div className='texInput'>
                  <input
                    className='nameInput12'
                    type='text'
                    onChange={(e) => {
                      setInputValue(e.target.value)
                      setTranslation(e.target.value)
                    }}
                    placeholder=''
                  />
                </div>

                <div className='text' name=''>
                  {signsList.length > 0 &&
                    signsList.map((path, ind) => {
                      return (
                        <React.Fragment key={ind}>
                          {path === undefined ? null : (
                            <img
                              alt='sign'
                              src={path}
                              width={50}
                              height={50}
                            />
                          )}
                        </React.Fragment>
                      )
                    })}
                </div>
              </div>
              <button className={shake ? "transBtn animationClass" :"transBtn"} onClick={animate}>Translate</button>
            </form> 
          </div>
        </div>
        <div className='footerMain'></div>
      </div>
    </>
  )
}

export default Translate

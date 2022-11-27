import React, { useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileTranslate from './ProfileTranslateHistory'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  GetUserData,
  Logout,
  UpdateUser,
} from '../../actionsTypes/userAction'
import img2 from '../../assets/Profile.png'

const Profile = () => {
  const Navigater = useNavigate()
  const dispatch = useDispatch()
  const { data } = useSelector((stata) => stata.userReducer.userData)
  const userName = localStorage.getItem('user')
  const ClearAll = () => {
    data.translate = []
    dispatch(UpdateUser(data))
    dispatch(GetUserData(userName))
  }
  const oneClear = (ind) => {
    data.translate.splice(ind, 1)
    dispatch(UpdateUser(data))
    dispatch(GetUserData(userName))
  }
  useEffect(() => {
    dispatch(GetUserData(userName))
  }, [userName])

  return (
    <>
      <ProfileHeader username={'hello'} />
      <div className='mainTrans'>
        <div className='innerDiv'>
          <div className='transTex'>
            <div className='transBox'>
              <div className='list_Parent' name='' id='' cols='30' rows='10'>
                {data.translate?.map((val, ind) => {
                  return (
                    <div>
                      {ind < 10 ? (
                        <div key={ind} className='list'>
                          <p>{val}</p>
                          <button onClick={() => oneClear(ind)}>delete</button>
                        </div>
                      ) : null}
                    </div>
                  )
                })}     
              </div>
              <div className='btnMain'>
                <div className='clearBtn'>
                  <button className='btnClear' onClick={ClearAll}>
                    Clear
                  </button>
                </div>
                <div className='logoutBtn'>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user')
                      Navigater('/')
                      dispatch(Logout())
                    }}
                    className='btnLogout'
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='iconImage'>
            <img className='image2' src={img2} alt='' />
          </div>
        </div>
      </div>
      <ProfileTranslate translate={'check'} />
    </>
  )
}

export default Profile

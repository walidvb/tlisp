import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../../frontend/actions/userActions'
import axios from 'axios'
import { routes } from '../../frontend/request';

axios.defaults.withCredentials = true
const useAuthentication = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const getUser = () => dispatch(getUserDetails())
  useEffect(() => {
    if (!user.loaded){
      getUser()
    }
    (async () => {
      const { data } = await axios.get(routes.api.users.me)
    })()
  }, [])

  return { 
    user, 
    getUser,
  }
}

export default useAuthentication
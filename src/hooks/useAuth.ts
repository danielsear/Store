import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContex'

function useAuth() {
  const value = useContext(AuthContext)
  return value
}
export default useAuth

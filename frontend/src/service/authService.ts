
import api from './api'
import { ElMessage } from 'element-plus'
export interface SignInResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}


export default {
  async signIn(email: string, password: string) {
    try {
      const res = await api.post('/auth/sign-in', { email, password })
      return res.data
    } catch (error) {
      // messageError = (error as Error).message
      ElMessage.error("Invalid Credentials")
    }
  },

  async signUp(email: string, password: string, name: string) {
    try {
      const res =  await api.post('/auth/sign-up', { email, password, name })
      return res.data
    } catch(error){
      console.log(error)
    }
  },

  async getMe() {
    try{
      return await api.get('/auth/me')
    }catch(error){
      console.log(error)
    }

  },

  refresh() {
    return api.post('/auth/refresh')
  },

  signOut() {
    return api.post('/auth/sign-out')
  },
}

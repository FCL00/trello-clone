import api from './api'

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
      console.log(error)
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

  getMe() {
    return api.get('/auth/me')
  },

  refresh() {
    return api.post('/auth/refresh')
  },

  signOut() {
    return api.post('/auth/sign-out')
  },
}

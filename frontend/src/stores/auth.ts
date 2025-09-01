// src/stores/auth.ts
import { defineStore } from 'pinia'
import authService from '@/service/authService'
import { ElMessage } from 'element-plus'
import type { User, AuthState } from '@/types/User'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    user: null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async initAuth() {
      try {
        console.log('🔄 initAuth running...')
        await this.refresh() // refresh already sets accessToken + user
        console.log('👤 user after initAuth', this.user)
        // const router = useRouter()
        // router.push('/dashboard')
      } catch {
        this.accessToken = null
        this.user = null
      }
    },

    async signIn(email: string, password: string) {
      this.loading = true
      try {
        const res = await authService.signIn(email, password)

        if(!res.ok) return
      } catch (error) {
        this.error = (error as Error).message
        console.log(this.error)
         // ElMessage.error(this.error)
      }
    },

    async signUp(email: string, password: string, name: string) {
      this.loading = true
      try {
        await authService.signUp(email, password, name)
        ElMessage.success('Successfully sign up')
      } finally {
        this.loading = false
      }
    },

    async refresh() {
      try {
        const res = await authService.refresh()
        this.accessToken = res.data.accessToken

        const me = await authService.getMe()
        this.user = me.data.user
      } catch {
        this.accessToken = null
        this.user = null
      }
    },

    async fetchMe() {
      if (!this.accessToken) return
      try {
        const res = await authService.getMe()
        this.user = res.data.user
      } catch (err: any) {
        if (err.response?.status === 401) {
          await this.refresh()
        }
      }
    },

    async signOut() {
      await authService.signOut()
      this.accessToken = null
      this.user = null
      ElMessage.success("successfully logout")
    },
  },
})

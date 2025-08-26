// src/stores/auth.ts
import { defineStore } from "pinia";
import  authService from "@/service/authService";
import { ElMessage } from "element-plus";
import type { User, AuthState } from "@/types/User"


export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
    user: null,
    loading: false,
  }),

  actions: {
    async signIn(email: string, password: string){
        this.loading = true
        try {
          const res = await authService.signIn(email, password)
          console.log(res)
          ElMessage.success("Succesful login")
        } catch(error){
          console.log(error)
        }
    },

     async signUp(email: string, password: string, name: string) {
      this.loading = true;
      try {
        await authService.signUp(email, password, name);
        ElMessage.success('Successfully sign up')
      } finally {
        this.loading = false;
      }
    },

    async fetchMe() {
      if (!this.accessToken) return;
      try {
        const res = await authService.getMe();
        this.user = res.data.user;
      } catch (err: any) {
        if (err.response?.status === 401) {
          await this.refresh();
        }
      }
    },

    async refresh() {
      try {
        const res = await authService.refresh();
        this.accessToken = res.data.accessToken;
        await this.fetchMe();
      } catch {
        this.accessToken = null;
        this.user = null;
      }
    },

    async signOut() {
      await authService.signOut();
      this.accessToken = null;
      this.user = null;
    },
  },
});

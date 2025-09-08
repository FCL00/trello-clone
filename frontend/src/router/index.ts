
import HomeView from '@/views/HomeView.vue'
import TaskView from '@/views/TaskView.vue'
import SignInView from '@/views/SignIn.vue'
import SignUpView from '@/views/SignUp.vue'
import WorkspaceView from '@/views/WorkspaceView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { guestOnly: true } },
    { path: '/sign-in', name: 'sign-in', component: SignInView, meta: { guestOnly: true } },
    { path: '/sign-up', name: 'sign-up', component: SignUpView, meta: { guestOnly: true} },
    { path: '/workspace', name: 'workspace', component: WorkspaceView, meta: { requiresAuth: true} },
    { path: '/tasks/:id', name: 'tasks', component: TaskView, meta: { requiresAuth: true} },

  ],
})

router.beforeEach(async (to, _, next) => {
  const auth = useAuthStore()

  // refresh first
  if(!auth.user && to.meta.requiresAuth){
    await auth.initAuth()
  }

  // check if the user is authenticated
  if (to.meta.requiresAuth && !auth.user) {
    return next('/')
  }

  // geust only
  if (to.meta.guestOnly && auth.user) {
    return next('/workspace') // redirect to dashboard
  }

  next()
})


export default router

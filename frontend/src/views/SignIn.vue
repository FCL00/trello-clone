<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Branding -->
      <div class="login-header">
        <h1 class="logo">Taskly</h1>
        <p class="subtitle">Sign in to continue to your workspace</p>
      </div>

      <!-- Auth Form -->
      <sign-in-form
        form-label="Sign In"
        confirm-button-text="Sign In"
        mode="sign-in"
        @on-submit="handleSignIn"
      />

      <!-- Extra Links -->
      <div class="login-footer">
        <p>Don’t have an account?
          <router-link to="/sign-up">Sign Up</router-link>
        </p>
        <p>
          <router-link to="/forgot-password">Forgot your password?</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AuthForm as SignInForm } from '@/components'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

interface FormData {
  email: string
  password: string
}

async function handleSignIn(formData: FormData) {
  const { email, password } = formData
  await authStore.signIn(email, password)
  router.push('/workspace')
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0065ff, #00bcd4);
  padding: 1rem;
}

.login-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;

  .login-header {
    margin-bottom: 2rem;

    .logo {
      font-size: 2rem;
      font-weight: 700;
      color: #0065ff;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 0.95rem;
      color: #555;
    }
  }

  .login-footer {
    margin-top: 1.5rem;

    p {
      font-size: 0.9rem;
      color: #333;

      a {
        color: #0065ff;
        font-weight: 500;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    p + p {
      margin-top: 0.5rem;
    }
  }
}
</style>

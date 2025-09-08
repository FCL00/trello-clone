<template>
  <div class="signup-page">
    <div class="signup-card">
      <!-- Branding -->
      <div class="signup-header">
        <h1 class="logo">Taskly</h1>
        <p class="subtitle">Create an account to get started</p>
      </div>

      <!-- Auth Form -->
      <sign-up-form
        mode="sign-up"
        @on-submit="signUp"
      />

      <!-- Extra Links -->
      <div class="signup-footer">
        <p>Already have an account?
          <router-link to="/sign-in">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AuthForm as SignUpForm } from "@/components"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"

const router = useRouter()
const authStore = useAuthStore()

interface formData {
  name: string
  email: string
  password: string
}

async function signUp(formData: formData) {
  const { name, email, password } = formData
  await authStore.signUp(email, password, name)
  router.push("/sign-in")
}
</script>

<style scoped lang="scss">
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0065ff, #00bcd4);
  padding: 1rem;
}

.signup-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;

  .signup-header {
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

  .signup-footer {
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
  }
}
</style>

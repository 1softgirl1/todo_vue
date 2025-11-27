<template>
  <section class="tasksContainer">
    <div class="login-page">
      <form class="register-form" @submit.prevent="onSubmit" novalidate>
        <input
          class="login_input"
          type="email"
          v-model="email"
          @blur="touchedEmail = true"
          placeholder="Email"
          aria-label="Email"
          required
        />

        <p v-if="touchedEmail && !isValidEmail" class="validation-error">
          Некорректный E-mail
        </p>

        <label class="input-group">
          <input
            class="login_input"
            type="password"
            v-model="password"
            @blur="touchedPassword = true"
            placeholder="Пароль"
            aria-label="Пароль"
            required
            minlength="6"
          />
        </label>

        <label class="input-group">
          <input
            class="login_input"
            type="password"
            v-model="confirmPassword"
            @blur="touchedConfirm = true"
            placeholder="Подтверждение пароля"
            aria-label="Подтверждение пароля"
            required
            minlength="6"
          />
        </label>
        <p v-if="touchedConfirm && !passwordsMatch" class="validation-error">
          Пароли не совпадают
        </p>

        <button
          id="register"
          class="button"
          type="submit"
          :disabled="!canSubmit"
        >
          {{ submitLabel }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router: Router = useRouter()

// Типы для полей формы
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const confirmPassword: Ref<string> = ref('')

const touchedEmail: Ref<boolean> = ref(false)
const touchedPassword: Ref<boolean> = ref(false)
const touchedConfirm: Ref<boolean> = ref(false)

const submitLabel = 'Sign Up'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isValidEmail = computed<boolean>(() => emailRegex.test(email.value))

const passwordsMatch = computed<boolean>(
  () => password.value !== '' && password.value === confirmPassword.value
)

const canSubmit = computed<boolean>(
  () => isValidEmail.value && passwordsMatch.value
)

const store = useUserStore()

const onSubmit = (): void => {
  touchedEmail.value = true
  touchedPassword.value = true
  touchedConfirm.value = true

  if (!canSubmit.value) return

  store.registerUser(email.value, password.value)
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  touchedEmail.value = false
  touchedPassword.value = false
  touchedConfirm.value = false

  router.push('/todos')
}
</script>

<style scoped>
.validation-error {
  color: #e53e3e;
  font-size: 0.9rem;
  margin: 6px 0;
}

.register-form .button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.register-form .button {
  width: 100%;
}
.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

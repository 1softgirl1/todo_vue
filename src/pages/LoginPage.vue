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

        <p v-if="touchedEmail && !isValidEmail" class="validation-error">Некорректный E-mail</p>

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

        <p v-if="errorMessage" id="error" class="validation-error">
          {{ errorMessage }}
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

<script setup>
  import { ref, computed } from 'vue';
  import { useUserStore } from '@/stores/useUserStore.js'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const store = useUserStore()
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('')

  const touchedEmail = ref(false);
  const touchedPassword = ref(false);

  const submitLabel = 'Log in';

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = computed(() => emailRegex.test(email.value));

  const canSubmit = computed(() => isValidEmail.value);

  async function onSubmit() {
    errorMessage.value = ''

    try {
      store.loginUser(email.value, password.value)
    } catch (err) {
      errorMessage.value = err.message
      return
    }

    touchedEmail.value = true
    touchedPassword.value = true

    if (!canSubmit.value) return

    console.log('Log in:', { email: email.value, password: password.value })

    email.value = ''
    password.value = ''

    touchedEmail.value = false
    touchedPassword.value = false
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
.register-form .button{
  width: 100%;

}
.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}


</style>

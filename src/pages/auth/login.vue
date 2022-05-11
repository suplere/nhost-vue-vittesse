<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const router = useRouter();
const auth = useAuthStore();
const email = $ref("");
const password = $ref("");
const { t } = useI18n();
const loginUser = async () => {
  try {
    const res = await auth.loginUser(email, password);
    if (res.error) {
      console.error(res.error);
    } else {
      router.push("/auth");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <p py-4>{{ t("auth.loginTitle") }}</p>
    <div>
      <input
        id="email"
        v-model="email"
        :placeholder="t('auth.email')"
        :aria-label="t('auth.email')"
        type="text"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      />
      <label class="hidden" for="input">{{ t("auth.email") }}</label>
    </div>
    <div py-4>
      <input
        id="password"
        v-model="password"
        :placeholder="t('auth.password')"
        :aria-label="t('auth.password')"
        type="password"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      />
      <label class="hidden" for="input">{{ t("auth.password") }}</label>
    </div>

    <div>
      <button btn m-3 text-sm :disabled="!email && !password" @click="loginUser">
        {{ t("auth.loginButton") }}
      </button>
    </div>
    <RouterLink class="btn bg-green mx-2" to="/auth/forgotPassword">
      <div>{{ t("auth.forgotPasswordTitle") }}</div>
    </RouterLink>
  </div>
</template>

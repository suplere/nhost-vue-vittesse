<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const email = $ref("");
const password = $ref("");
const confirmPassword = $ref("");
const { t } = useI18n();
const router = useRouter();
const registerUser = async () => {
  try {
    const res = await auth.createAccount(email, password);
    if (!res.error) router.push("/");
    if (res.error) console.error(res.error);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <p py-4>{{ t("auth.registerTitle") }}</p>
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
    <div py-4>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        :placeholder="t('auth.confirmPassword')"
        :aria-label="t('auth.confirmPassword')"
        type="password"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      />
      <label class="hidden" for="input">{{ t("auth.confirmPassword") }}</label>
    </div>
    <div>
      <button
        btn
        m-3
        text-sm
        :disabled="!email && (!password || password !== confirmPassword)"
        @click="registerUser"
      >
        {{ t("auth.registerButton") }}
      </button>
    </div>
  </div>
</template>

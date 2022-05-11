<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const router = useRouter();
const auth = useAuthStore();
const email = $ref("");
const { t } = useI18n();
const resetPassword = async () => {
  try {
    const res = await auth.recoverPassword(email);
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
    <p py-4>{{ t("auth.forgotTitle") }}</p>
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
    <div>
      <button btn m-3 text-sm :disabled="!email" @click="resetPassword">
        {{ t("auth.lostButton") }}
      </button>
    </div>
  </div>
</template>

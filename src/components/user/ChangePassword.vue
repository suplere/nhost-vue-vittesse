<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const props = defineProps<{
  redirect: boolean;
}>();

const auth = useAuthStore();
const password = $ref("");
const confirmPassword = $ref("");
const { t } = useI18n();
const router = useRouter();
const changePassword = async () => {
  try {
    const res = await auth.changePassword(password);
    if (!res.error && props.redirect) router.push("/");
    if (res.error) console.error(res.error);
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <p py-4>{{ t("auth.changePasswordTitle") }}</p>
  <div>
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
        :disabled="!password || password !== confirmPassword"
        @click="changePassword"
      >
        {{ t("auth.changePasswordButton") }}
      </button>
    </div>
  </div>
</template>

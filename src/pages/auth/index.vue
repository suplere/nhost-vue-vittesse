<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();
const auth = useAuthStore();
</script>
<template>
  <div>
    <nav text-xl mt-6>
      <RouterLink
        v-if="!auth.isAuthenticated"
        class="icon-btn mx-2"
        to="/auth/login"
        :title="t('auth.navLogin')"
      >
        <button btn m-3 text-sm>
          {{ t("auth.navLogin") }}
        </button>
      </RouterLink>
      <RouterLink
        v-if="!auth.isAuthenticated"
        class="icon-btn mx-2"
        to="/auth/register"
        :title="t('auth.navRegister')"
      >
        <button btn m-3 text-sm>
          {{ t("auth.navRegister") }}
        </button>
      </RouterLink>
      <RouterLink
        v-if="auth.isAuthenticated"
        class="icon-btn mx-2"
        to="/auth/logout"
        :title="t('auth.navLogout')"
      >
        <button btn m-3 text-sm>
          {{ t("auth.navLogout") }}
        </button>
      </RouterLink>
    </nav>
    <Profile />
  </div>
</template>

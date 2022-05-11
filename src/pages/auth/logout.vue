<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const router = useRouter();
const logout = () =>
  auth.logoutUser().then((res) => {
    if (!res.error) router.push("/");
  });

onMounted(() => logout());
</script>
<template>
  <div></div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div>{{ t("page.profile.title") }}</div>
  <ChangePassword :redirect="false" />
</template>

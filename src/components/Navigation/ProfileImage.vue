<template>
  <img :src="imageLink" alt="user profile image" class="object-contain h-8 rounded-3xl" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const imageLink = ref(
  'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
)
</script>

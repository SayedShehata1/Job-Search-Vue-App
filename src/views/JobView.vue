<template>
  <div>
    <h1>Job Page</h1>
    <p>Current Job ID: {{ currentJobId }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentJobId = ref(route.params.id)
</script>

<template>
  <section class="mb-16">
    <h1 class="font-bold tracking-tighter mb-14 text-8xl">
      <span :class="actionClass">
        {{ action }}
      </span>
      for everyone
    </h1>
    <h2>Find your next job at Google Careers</h2>
  </section>
</template>

<script lang="ts" setup>
import nextElementInList from '@/utils/nextElementInList'

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const action = ref('Build')
// here use generic type to define the type of the interval variable
const interval = ref<ReturnType<typeof setInterval>>()

const actionClass = computed(() => {
  return {
    // dynamic key to bind the class
    [action.value.toLowerCase()]: true
  }
})

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code']
    action.value = nextElementInList(actions, action.value)
  }, 3000)
}

// lifecycle hook to run the changeTitle function when the component is mounted
onMounted(() => {
  changeTitle()
})

// lifecycle hook to clear the interval when the component is unmounted
onBeforeUnmount(() => {
  clearInterval(interval.value)
})
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>

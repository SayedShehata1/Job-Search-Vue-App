<template>
  <div class="mt-2">
    <input
      v-model="skillsSearchTerm"
      type="text"
      class="w-full h-12 p-3 text-base border-solid rounded border-brand-gray-1 shadow-gray"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()

const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm
  },
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value)
  }
})
</script>

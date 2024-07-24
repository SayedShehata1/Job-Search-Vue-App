<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
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

// Computed property to get and set the skills search term
const skillsSearchTerm = computed({
  // Getter function to get the value of the skills search term
  get() {
    return userStore.skillsSearchTerm
  },
  // Setter function to set the value of the skills search term
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value)
  }
})
</script>

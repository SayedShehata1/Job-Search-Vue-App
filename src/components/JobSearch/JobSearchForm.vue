<template>
  <form
    class="flex items-center w-full h-12 border border-solid rounded-3xl border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex flex-1 h-full text-base font-light flex-nowrap">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label for="role" class="absolute left-0 -top-10">Role</label>

        <text-input id="role" v-model="role" placeholder="Search for jobs" />
      </div>
      <span
        class="flex items-center h-full px-3 border-l border-r border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label for="location" class="absolute left-0 -top-10">Where?</label>

        <text-input id="location" v-model="location" placeholder="Cairo, Egypt" />
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ActionButton from '@/components/Shared/ActionButton.vue'
import TextInput from '@/components/Shared/TextInput.vue'

const role = ref('')
const location = ref('')
// this is a hook from vue-router that allows us to navigate between pages
const router = useRouter()

const searchForJobs = () => {
  // this will navigate to the JobResults page and pass the role and location as query params
  router.push({
    name: 'JobResults',
    query: {
      role: role.value,
      location: location.value
    }
  })
}
</script>

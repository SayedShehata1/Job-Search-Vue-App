<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultPage">
        <font-awesome-icon :icon="[`fas`, `search`]" class="mr-3" />
        <span>
          <span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs'
// composition API functions
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const onJobResultPage = computed(() => route.name === 'JobResults')

// how we access the store and its state in the composition API
const jobsStore = useJobsStore()
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
</script>

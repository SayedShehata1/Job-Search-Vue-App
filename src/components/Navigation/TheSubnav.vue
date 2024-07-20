<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultPage">
        <font-awesome-icon :icon="[`fas`, `search`]" class="mr-3" />
        <span>
          <span class="text-brand-green-1">{{ FILTERED_JOBS_ORGANIZATIONS.length }}</span> jobs
          matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useJobsStore, FILTERED_JOBS_ORGANIZATIONS } from '@/stores/jobs'

export default {
  name: 'TheSubnav',
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS_ORGANIZATIONS]),
    onJobResultPage() {
      return this.$route.name === 'JobResults'
    }
  }
}
</script>

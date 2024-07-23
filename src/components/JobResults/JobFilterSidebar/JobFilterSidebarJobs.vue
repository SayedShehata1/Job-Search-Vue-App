<template>
  <job-filter-sidebar-checkbox-group
    :unique-values="UNIQUE_JOB_TYPES"
    :action="ADD_SELECTED_JOB_TYPES"
  />
</template>

<script lang="ts" setup>
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'
import { computed } from 'vue'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

const jobsStore = useJobsStore()
const userStore = useUserStore()

// unique job types from jobs store
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)
// action to add selected job types to user store
const ADD_SELECTED_JOB_TYPES = userStore.ADD_SELECTED_JOB_TYPES
</script>

<template>
  <job-filter-sidebar-checkbox-group
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts" setup>
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'
import { computed } from 'vue'

import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
const userStore = useUserStore()

// unique organizations from jobs store
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)

// action to add selected organizations to user store
const ADD_SELECTED_ORGANIZATIONS = userStore.ADD_SELECTED_ORGANIZATIONS
</script>

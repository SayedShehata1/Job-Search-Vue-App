<template>
  <job-filter-sidebar-checkbox-group
    :unique-values="new Set(UNIQUE_DEGREES)"
    :action="ADD_SELECTED_DEGREES"
  />
</template>

<script lang="ts" setup>
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'
import { useDegreesStore } from '@/stores/degrees'
import { useUserStore } from '@/stores/user'

import { computed } from 'vue'

const degreeStore = useDegreesStore()
const userStore = useUserStore()

// unique degrees from degrees store
const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES)
// action to add selected degrees to user store
const ADD_SELECTED_DEGREES = userStore.ADD_SELECTED_DEGREES
</script>

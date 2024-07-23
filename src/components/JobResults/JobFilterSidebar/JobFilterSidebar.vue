<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid w-96 border-brand-gray-1">
    <section>
      <div class="pb-5">
        <div class="flex justify-between">
          <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
          <div class="flex items-center text-sm">
            <action-button
              text="Clear Filters"
              type="secondary"
              @click="CLEAR_USER_JOB_FILTER_SELECTIONS"
            ></action-button>
          </div>
        </div>
      </div>
      <collapsible-accordion header="Degrees">
        <job-filter-sidebar-checkbox-group
          :unique-values="UNIQUE_DEGREES"
          :action="ADD_SELECTED_DEGREES"
        />
      </collapsible-accordion>
      <collapsible-accordion header="Job Types">
        <job-filter-sidebar-checkbox-group
          :unique-values="UNIQUE_JOB_TYPES"
          :action="ADD_SELECTED_JOB_TYPES"
        />
      </collapsible-accordion>
      <collapsible-accordion header="Organizations">
        <job-filter-sidebar-checkbox-group
          :unique-values="UNIQUE_ORGANIZATIONS"
          :action="ADD_SELECTED_ORGANIZATIONS"
        />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'

import { computed } from 'vue'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const degreeStore = useDegreesStore()

const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)
const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES)

const ADD_SELECTED_JOB_TYPES = userStore.ADD_SELECTED_JOB_TYPES
const ADD_SELECTED_ORGANIZATIONS = userStore.ADD_SELECTED_ORGANIZATIONS
const ADD_SELECTED_DEGREES = userStore.ADD_SELECTED_DEGREES

const CLEAR_USER_JOB_FILTER_SELECTIONS = userStore.CLEAR_USER_JOB_FILTER_SELECTIONS
</script>

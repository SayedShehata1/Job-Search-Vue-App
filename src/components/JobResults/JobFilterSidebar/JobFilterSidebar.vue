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
        <job-filter-sidebar-degrees />
      </collapsible-accordion>
      <collapsible-accordion header="Job Types">
        <job-filter-sidebar-jobs />
      </collapsible-accordion>
      <collapsible-accordion header="Organizations">
        <job-filter-sidebar-organizations />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import JobFilterSidebarDegrees from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarDegrees.vue'
import JobFilterSidebarJobs from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobs.vue'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// action to clear user job filter selections
const CLEAR_USER_JOB_FILTER_SELECTIONS = userStore.CLEAR_USER_JOB_FILTER_SELECTIONS
</script>

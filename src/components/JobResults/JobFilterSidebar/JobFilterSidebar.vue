<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid w-96 border-brand-gray-1">
    <section>
      <div class="pb-5">
        <job-filter-sidebar-prompt />
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
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import JobFilterSidebarDegrees from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarDegrees.vue'
import JobFilterSidebarJobs from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobs.vue'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'
import JobFilterSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarPrompt.vue'
</script>

<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid w-96 border-brand-gray-1">
    <section>
      <div class="pb-5">
        <div class="flex justify-between">
          <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
          <div class="flex items-center text-sm">
            <action-button text="Clear Filters" type="secondary"></action-button>
          </div>
        </div>
      </div>
      <collapsible-accordion header="Degree"> </collapsible-accordion>
      <job-filter-sidebar-job-types />

      <job-filter-sidebar-organizations />
    </section>
  </div>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue'

export default {
  name: 'JobFilterSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion,
    JobFilterSidebarOrganizations,
    JobFilterSidebarJobTypes
  }
}
</script>

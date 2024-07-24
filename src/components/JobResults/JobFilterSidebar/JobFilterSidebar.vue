<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid w-96 border-brand-gray-1">
    <section class="pb-5">
      <job-filter-sidebar-prompt />

      <job-filtere-sidebar-skills />

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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import JobFilterSidebarDegrees from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarDegrees.vue'
import JobFilterSidebarJobs from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobs.vue'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'
import JobFilterSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarPrompt.vue'
import JobFiltereSidebarSkills from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarSkills.vue'

import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()

// handle skills search term from query params
const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || ''
  userStore.UPDATE_SKILLS_SEARCH_TERM(role)
}

onMounted(() => {
  // call parseSkillsSearchTerm on component mount
  parseSkillsSearchTerm()
})
</script>

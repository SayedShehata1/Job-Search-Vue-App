<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="jobType in UNIQUE_JOB_TYPES" :key="jobType" class="w-1/2 h-8">
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useJobsStore, UNIQUE_JOB_TYPES } from '@/stores/jobs'
import { useUserStore, ADD_SELECTED_JOB_TYPES } from '@/stores/user'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
export default {
  name: 'JobFilterSidebarJobTypes',
  components: {
    CollapsibleAccordion
  },
  data() {
    return {
      selectedJobTypes: []
    }
  },
  computed: {
    //  with the mapState helper we can map the store state to the component's computed properties
    // first argument is the store we want to map to, and the second argument is an array of the store's (state or getter )we want to map
    ...mapState(useJobsStore, [UNIQUE_JOB_TYPES])
  },
  methods: {
    // with the mapActions helper we can map the store actions to the component's methods
    ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),

    // this method is called when the user selects an organization to filter by and it adds the selected organization to the user store
    selectJobType() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes)
      // this will update the URL query params with the selected job types
      this.$router.push({ name: 'JobResults' })
    }
  }
}
</script>

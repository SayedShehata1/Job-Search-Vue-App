<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="Organization in UNIQUE_ORGANIZATIONS" :key="Organization" class="w-1/2 h-8">
            <input
              :id="Organization"
              v-model="selectedOrganizations"
              :value="Organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="Organization">{{ Organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs'
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from '@/stores/user'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
export default {
  name: 'JobFilterSidebarOrganizations',
  components: {
    CollapsibleAccordion
  },
  data() {
    return {
      selectedOrganizations: []
    }
  },
  computed: {
    //  with the mapState helper we can map the store state to the component's computed properties
    // first argument is the store we want to map to, and the second argument is an array of the store's (state or getter )we want to map
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS])
  },
  methods: {
    // with the mapActions helper we can map the store actions to the component's methods
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),

    // this method is called when the user selects an organization to filter by and it adds the selected organization to the user store
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations)
    }
  }
}
</script>

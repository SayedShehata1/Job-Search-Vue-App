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

<script setup>
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const selectedOrganizations = ref([])

const jobsStore = useJobsStore()
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)

const userStore = useUserStore()
const ADD_SELECTED_ORGANIZATIONS = userStore.ADD_SELECTED_ORGANIZATIONS
const router = useRouter()

const selectOrganization = () => {
  ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value)
  router.push({ name: 'JobResults' })
}
</script>

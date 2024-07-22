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

<script setup>
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

// composition API functions
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// initialize selectedJobTypes as a ref with an empty array
const selectedJobTypes = ref([])

// how we access the store and its state in the composition API
const jobsStore = useJobsStore()
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)

const userStore = useUserStore()
// how we access the store and its **actions** in the composition API
const ADD_SELECTED_JOB_TYPES = userStore.ADD_SELECTED_JOB_TYPES
const router = useRouter()

const selectJobType = () => {
  ADD_SELECTED_JOB_TYPES(selectedJobTypes.value)
  router.push({ name: 'JobResults' })
}
</script>

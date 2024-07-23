<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing v-for="job of displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{
              name: 'JobResults',
              query: {
                page: previousPage
              }
            }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            role="link"
            :to="{
              name: 'JobResults',
              query: {
                page: nextPage
              }
            }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import JobListing from '@/components/JobResults/JobListing.vue'
import { useJobsStore } from '@/stores/jobs'
import { useDegreesStore } from '@/stores/degrees'

import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

const jobsStore = useJobsStore()
// Fetch jobs on component mount
onMounted(jobsStore.FETCH_JOBS)

// Fetch degrees on component mount
const degreesStore = useDegreesStore()
onMounted(degreesStore.FETCH_DEGREES)

const route = useRoute()

//  make currentPage and maxPage reactive by using computed
const currentPage = computed(() => {
  return Number.parseInt((route.query.page as string) || '1')
})
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))

// use the usePreviousAndNextPages composable to get the previous and next page numbers
const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage)

// create a computed property displayedJobs that returns the jobs to display on the current page
const FILTERED_JOBS = computed(() => {
  return jobsStore.FILTERED_JOBS
})

// slice the filtered jobs array to get the jobs to display on the current page
const displayedJobs = computed(() => {
  const pageString = currentPage.value
  const pageNumber = Number.parseInt(pageString)
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})
</script>

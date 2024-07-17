<template>
  <div class="flex flex-row w-full flex-nowrap">
    <job-filter-sidebar />
    <job-listing />
  </div>
</template>

<script>
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue'
import JobListing from '@/components/JobResults/JobListings.vue'
export default {
  name: 'JobResultsView',

  components: {
    JobFilterSidebar,
    JobListing
  }
}
</script>

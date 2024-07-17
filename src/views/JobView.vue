<template>
  <div>
    <h1>Job Page</h1>
    <p>Current Job ID: {{ currentJobId }}</p>
  </div>
</template>

<script>
export default {
  name: 'JobView',
  computed: {
    currentJobId() {
      return this.$route.params.id
    }
  }
}
</script>

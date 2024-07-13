<template>
  <section>
    <h1 class="font-bold tracking-tighter mb-14 text-8xl">
      <span :class="actionClass">
        {{ action }}
      </span>
      for everyone
    </h1>
    <h2>Find your next job at Google Careers</h2>
  </section>
</template>

<script>
import nextElementInList from '@/utils/nextElementInList'

export default {
  name: 'TheHeadline',
  data() {
    return {
      action: 'Build',
      interval: null
    }
  },
  computed: {
    actionClass() {
      return {
        // dynamic key to bind the class
        [this.action.toLowerCase()]: true
      }
    }
  },
  created() {
    this.changeTitle()
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ['Build', 'Create', 'Design', 'Code']
        this.action = nextElementInList(actions, this.action)
      }, 3000)
    }
  }
}
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>

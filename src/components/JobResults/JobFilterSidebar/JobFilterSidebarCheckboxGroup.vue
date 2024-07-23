<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
// composition API functions
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS } from '@/stores/user'

const selectedValues = ref<string[]>([])

// make the props available to the component using defineProps
const props = defineProps({
  uniqueValues: {
    type: Set<string>,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})

const router = useRouter()
const selectValue = () => {
  props.action(selectedValues.value)
  router.push({ name: 'JobResults' })
}
//  use the user store to clear the selected values
const userStore = useUserStore()
// listen for the action to clear the selected values
// which mean after the action is called, the selected values should be cleared
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = []
    }
  })
})
</script>

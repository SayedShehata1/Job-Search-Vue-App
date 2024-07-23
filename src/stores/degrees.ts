import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Degree } from '@/api/types'

import getDegrees from '@/api/getDegrees'

export const UNIQUE_DEGREES = 'UNIQUE_DEGREES'
export const useDegreesStore = defineStore('degrees', () => {
  // Define the degrees state as an empty array
  const degrees = ref<Degree[]>([])
  //   Define the FETCH_DEGREES action that fetches degrees from the API
  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees()
    degrees.value = receivedDegrees
  }

  //   Define the UNIQUE_DEGREES getter that returns a list of unique degrees
  const UNIQUE_DEGREES = computed(() => degrees.value.map((degree) => degree.degree))

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES }
})

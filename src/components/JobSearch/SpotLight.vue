<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

interface Spotlight {
  id: number
  img: string
  title: string
  description: string
}

const spotlights = ref<Spotlight[]>([])

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await axios.get<Spotlight[]>(`${baseUrl}/spotlights`)
  spotlights.value = response.data
}

onMounted(getSpotlights)
</script>

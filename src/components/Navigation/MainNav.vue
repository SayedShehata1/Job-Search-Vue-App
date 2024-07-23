<template>
  <header :class="['w-full , text-sm', headerHightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex h-full px-8 mx-auto border-b border-solid flex-nowrap border-brand-gray-1">
        <router-link to="/" class="flex items-center h-full text-xl">Google Careers</router-link>
        <nav class="h-full ml-12">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="h-full ml-9 first:ml-0">
              <router-link :to="menuItem.url" class="flex h-full items-center py-2.5">{{
                menuItem.text
              }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" type="primary" @click="LOGIN_USER" />
        </div>
      </div>
      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ref, computed } from 'vue'

import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  { text: 'Location', url: '/' },
  { text: 'Life at Google', url: '/' },
  { text: 'How we hire', url: '/' },
  { text: 'Students', url: '/' },
  { text: 'Jobs', url: '/jobs/results' }
])

const userStore = useUserStore()
const LOGIN_USER = userStore.LOGIN_USER
const isLoggedIn = computed(() => userStore.isLoggedIn)

const headerHightClass = computed(() => {
  return {
    'h-16': !isLoggedIn.value,
    'h-32': isLoggedIn.value
  }
})
</script>

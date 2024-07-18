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
          <action-button v-else text="Sign in" type="primary" @click="loginUser" />
        </div>
      </div>
      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav
  },
  data() {
    return {
      menuItems: [
        { text: 'Teams', url: '/' },
        { text: 'Location', url: '/' },
        { text: 'Life at Google', url: '/' },
        { text: 'How we hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: '/jobs/results' }
      ]
    }
  },
  computed: {
    // mapStores is a helper function that takes a store and returns an object that can be used to map the store to the component instance
    // mapState is a helper function that takes a store and an array of state properties and returns an object that can be used to map the state properties to the component instance
    ...mapState(useUserStore, ['isLoggedIn']),

    headerHightClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn
      }
    }
  },
  methods: {
    // mapActions is a helper function that takes a store and an array of action properties and returns an object that can be used to map the action properties to the component instance
    ...mapActions(useUserStore, ['loginUser'])
  }
}
</script>

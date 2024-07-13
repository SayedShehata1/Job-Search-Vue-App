<template>
  <header :class="['w-full , text-sm', headerHightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex h-full px-8 mx-auto border-b border-solid flex-nowrap border-brand-gray-1">
        <a :href="url" class="flex items-center h-full text-xl">{{ company }}</a>
        <nav class="h-full ml-12">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem" class="h-full ml-9 first:ml-0">
              <a href="" class="flex h-full items-center py-2.5">{{ menuItem }}</a>
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
      company: 'Google Careers',
      url: 'https://careers.google.com',
      menuItems: ['Teams', 'Location', 'Life at Google', 'How we hire', 'Students', 'Jobs'],
      isLoggedIn: false
    }
  },
  computed: {
    headerHightClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn
      }
    }
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
}
</script>

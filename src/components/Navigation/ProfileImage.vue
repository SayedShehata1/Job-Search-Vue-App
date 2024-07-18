<template>
  <img :src="imageLink" alt="user profile image" class="object-contain h-8 rounded-3xl" />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageLink:
        'https://images.unsplash.com/photo-1535585105038-bf206e97d068?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  }
}
</script>

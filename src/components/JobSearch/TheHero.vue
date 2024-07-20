<template>
  <main class="flex flex-col h-screen">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>
        <div class="col-span-5 col-start-2">
          <the-headline />
          <job-search-form />
        </div>
        <div class="self-center col-span-5 col-start-7 justify-self-center">
          <img
            src="https://www.gstatic.com/hiring/CportalUi/hero_1_1x.png"
            alt="Hero Image"
            class="object-contain h-80 w-80"
          />
        </div>
        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>
    <spot-light class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg h-96 w-72 bg-brand-gray-2"
        >
          <img class="object-contain" :src="img" />
          <div class="h-48 px-6 py-4 mt-3">
            <h3 class="text-lg font-medium">{{ title }}</h3>
            <p class="mt-3 text-sm">{{ description }}</p>
          </div>
          <router-link to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See jobs</router-link
          >
        </router-link>
      </template>
    </spot-light>
  </main>
</template>

<script>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import SpotLight from '@/components/JobSearch/SpotLight.vue'
export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm,
    SpotLight
  }
}
</script>

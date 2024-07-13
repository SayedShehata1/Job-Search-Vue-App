<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20">
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
  </main>
</template>

<script>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'

export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm
  }
}
</script>

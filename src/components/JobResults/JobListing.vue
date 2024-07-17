<template>
  <li class="mb-7">
    <router-link
      to="/jobs/results/1"
      class="block mx-auto bg-white border border-solid rounded border-brand-gray-2 hover:shadow-gray"
    >
      <div class="pt-5 pb-2 mx-8 border-b border-solid border-brand-gray-2">
        <h2>Technical Program Manger, Perception, Augmented Reality</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>Google</span>
          </div>
          <div>
            <span>San Francisco, CA, USA</span>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3>Qualifications</h3>
          <div>
            <ul class="pl-8 list-disc">
              <li>Bachelor's degree or equivalent management</li>
              <li>5 years of experience in program management</li>
              <li>
                Experience analyzing data through querying database (e.g.,SQL) using spreadsheet
                software, and creating statistical models.
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link to="/jobs/results/1" class="text-brand-blue-1">Expand</router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'JobListing'
}
</script>

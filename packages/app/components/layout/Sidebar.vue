<template>
  <div class="flex flex-col pt-8 p-6 h-screen border-r border-gray-200">
    <div class="flex-1">
      <div class="flex flex-row items-center">
        <span class="w-10 h-10 rounded bg-blue-200"></span>
        <div class="pl-4">
          <h3 class="text-xl font-bold text-black">{{ projectName }}</h3>
          <p class="text-xs text-gray-500">Mickaël Marquez</p>
        </div>
      </div>
      <tables class="pt-10" />
      <pages class="pt-10" />
      <components class="pt-10" />
    </div>
    <div>
      <a
        :href="projectURL"
        target="_blank"
        class="text-sm text-blue-500 block mb-2"
      >
        {{ projectURL }}
      </a>
      <btn :onClick="build" class="w-full">
        <upload-cloud-icon size="18" class="mr-1 text-blue-500">
        </upload-cloud-icon>
        <span v-if="!loading">Deploy your app</span>
        <span v-else>Deploying...</span>
      </btn>
    </div>
  </div>
</template>

<script lang="ts">
import { UploadCloudIcon } from 'vue-feather-icons'
import tables from './Tables'
import components from './Components'
import pages from './Pages'

import btn from '~/components/ui/Button'

export default {
  components: {
    components,
    pages,
    tables,
    btn,
    UploadCloudIcon
  },
  data: function() {
    return {
      loading: false,
      projectName: this.$store.state.project.name,
      projectURL: `https://${this.$store.state.project.slug}.hosting.churni.io`
    }
  },
  methods: {
    build: async function() {
      console.log('build')
      this.$data.loading = true
      await this.$fireFunc.httpsCallable('build-deploy')({
        projectID: this.$store.state.project.id,
        slug: this.$store.state.project.slug
      })
      this.$data.loading = false
    }
  }
}
</script>

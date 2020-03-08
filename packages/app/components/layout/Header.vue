<template>
  <div class="bg-gray-300 p-5 flex items-center justify-between">
    <div>
      <div class="text-xl">Header</div>
      <div class="text-sm">http://yoplabidule.web.app</div>
    </div>
    <button class="button--green" @click="build">
      <span v-if="!loading">Build</span><span v-else>Building...</span>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  data: function() {
    return {
      loading: false
    }
  },
  methods: {
    build: async function() {
      this.$data.loading = true
      await this.$fireFunc.httpsCallable('build-test')()
      this.$data.loading = false
    }
  }
}
</script>

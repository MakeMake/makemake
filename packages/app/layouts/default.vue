<template>
  <div v-if="init">
    <nuxt />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      init: false
    }
  },
  async mounted() {
    try {
      console.log(this)

      // Binds it on client-side
      await this.$store.dispatch('listenAuth')
      this.init = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style>
html {
  @apply antialiased;
}
</style>

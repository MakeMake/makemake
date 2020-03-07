<template>
  <div class="flex h-screen justify-center items-center">
    {{ user }}
    Dashboard
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style></style>

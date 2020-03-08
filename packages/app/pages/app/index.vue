<template>
  <layout>Homepage</layout>
</template>

<script lang="ts">
import layout from '~/components/layout/Layout'

export default {
  middleware: 'auth',
  components: {
    layout
  }
}
</script>

<style></style>

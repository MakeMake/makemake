<template>
  <h1 class="text-4xl font-bold" :class="'text-' + this.color">
    {{ this.value }}
  </h1>
</template>

<script>
export default {
  props: {
    value: String,
    color: {
      type: String,
      default: 'black'
    }
  }
}
</script>

<style></style>

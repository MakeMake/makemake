<template>
  <span
    class="uppercase font-semibold tracking-wider text-xs block mb-2"
    :class="'text-' + this.color"
    >{{ this.value }}
  </span>
</template>

<script>
export default {
  props: {
    value: String,
    color: {
      type: String,
      default: 'gray-500'
    }
  }
}
</script>

<style></style>

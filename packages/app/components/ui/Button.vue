<template>
  <button
    @click="onClick"
    class="button"
    :class="'border-' + this.color + ' text-' + this.color"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    },
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>
.button {
  @apply flex content-center items-center justify-center border-t-2 border-l-2 border-r-2 border-b-4 px-4 py-1 rounded tracking-wide text-base text-sm font-semibold transition duration-150 ease-in-out;
  &:hover {
    @apply border-b-8 -mt-1;
  }
  &:active {
    @apply border-b-4 mt-0;
  }
  &:focus {
    @apply outline-none;
  }
}
</style>

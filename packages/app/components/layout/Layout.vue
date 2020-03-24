<template>
  <div class="flex">
    <div class="w-64">
      <sidebar />
    </div>
    <div class="flex-1 overflow-y-scroll h-screen">
      <div class="py-6 px-6 lg:px-16 xl:px-24">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './Sidebar'

export default {
  components: {
    sidebar
  }
}
</script>

<template>
  <div class="flex">
    <div class="w-64">
      <sidebar />
    </div>
    <div class="flex-1 overflow-y-scroll h-screen">
      <header-comp />
      <div class="pt-10 p-20">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './Sidebar'
import headerComp from './Header'

export default {
  components: {
    sidebar,
    headerComp
  }
}
</script>

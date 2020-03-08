<template>
  <div class="flex">
    <div class="w-64">
      <sidebar />
    </div>
    <div class="flex-1">
      <header-comp />
      <div class="pt-10 p-5">
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

<template>
  <div class="bg-gray-100 p-5 h-screen">
    <div class="text-xl">Sidebar</div>

    <tables class="pt-10" />
    <pages class="pt-10" />
    <components class="pt-10" />
  </div>
</template>

<script>
import tables from './Tables'
import components from './Components'
import pages from './Pages'

export default {
  components: {
    components,
    pages,
    tables
  }
}
</script>

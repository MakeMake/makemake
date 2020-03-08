<template>
  <div>
    <div>
      Pages
    </div>
    <ul class="pl-5">
      <li v-for="page in pages" :key="page.id">
        <router-link :to="'/app/pages/' + page.name" class="text-blue-700">{{
          page.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['pages'])
  },
  mounted() {
    this.$store.dispatch('listenPages')
  },
  methods: {
    build: async function() {
      await this.$fireFunc.httpsCallable('build-test')()
    }
  }
}
</script>

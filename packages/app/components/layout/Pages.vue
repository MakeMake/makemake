<template>
  <div>
    <div>
      Pages
    </div>
    <ul class="pl-5">
      <li v-for="page in pages" :key="page.id">
        <router-link :to="'/app/pages/' + page.id" class="text-blue-700">{{
          page.name
        }}</router-link>
      </li>
      <li>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="createPage()"
        >
          Create page
        </button>
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
    createPage: function() {
      this.$store.dispatch('createPage')
    },
    build: async function() {
      await this.$fireFunc.httpsCallable('build-test')()
    }
  }
}
</script>

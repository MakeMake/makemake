<template>
  <div>
    Tables
    <ul class="pl-5">
      <li v-for="table in tables" :key="table.id">
        <router-link :to="'/app/tables/' + table.id" class="text-blue-700">{{
          table.name
        }}</router-link>
      </li>
      <li>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="createTable()"
        >
          Create table
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tables'])
  },
  mounted() {
    this.$store.dispatch('listenTables')
  },
  methods: {
    createTable: function() {
      this.$store.dispatch('createTable')
    }
  }
}
</script>

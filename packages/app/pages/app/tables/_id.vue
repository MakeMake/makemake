<template>
  <layout>
    <div v-if="!table"></div>
    <div v-else>
      <div
        class="flex items-center justify-between align-items sticky top-0 bg-white py-2 z-10 border-b-2 border-gray-200 mb-6"
      >
        <div>
          <div
            contenteditable="true"
            class="-mt-4"
            @blur="onNameChange"
            v-text="table.name"
          />
        </div>
        <div>
          <btn :on-click="save">
            <check-circle-icon size="18" class="mr-1 text-green-600">
            </check-circle-icon>
            Save
          </btn>
        </div>
      </div>
      <div :class="{ grid: true, [`grid-cols-${table.columns.length}`]: true }">
        <div v-for="column in table.columns" :key="column.id">
          <div v-text="column.name" />
        </div>
      </div>
      <div
        v-for="record in records"
        :key="record.id"
        :class="{ grid: true, [`grid-cols-${table.columns.length}`]: true }"
      >
        <div v-for="[id, field] in Object.entries(record.fields)" :key="id">
          <div v-text="field" />
        </div>
      </div>
      <btn :on-click="createRecord">
        Create Record
      </btn>
    </div>
  </layout>
</template>

<script>
import layout from '~/components/layout/Layout'
import btn from '~/components/ui/Button'

export default {
  components: {
    layout,
    btn
  },
  data: function({ params }) {
    return {
      table: this.$store.getters.table(this.$route.params.id),
      records: this.$store.getters.records
    }
  },
  mounted() {
    this.$store.dispatch('listenRecords', this.$route.params.id)
  },
  methods: {
    onNameChange: function(newName) {
      this.$data.table.name = newName.target.textContent
    },
    createRecord: function() {
      const defaultFields = this.$data.table.columns.reduce((acc, obj) => {
        return {
          ...acc,
          [obj.id]: 'value'
        }
      }, {})

      this.$store.dispatch('createRecord', {
        fields: defaultFields,
        tableID: this.$route.params.id
      })
    },
    save: function() {
      const table = this.$data.table

      this.$store.dispatch('updateTable', table)
    }
  }
}
</script>

<style></style>

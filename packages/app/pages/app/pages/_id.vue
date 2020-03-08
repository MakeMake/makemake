<template>
  <layout>
    <div v-if="!page"></div>
    <div v-else>
      <div class="flex justify-between align-items">
        <div class="text-xl">{{ page.name }}</div>
        <div>
          <button class="button--green" @click="save">Save</button>
        </div>
      </div>

      <div class="text-xl pt-10">
        <label class="block">
          <span class="text-gray-700">Script</span>
          <textarea
            :value="page.script"
            @input="page.script = $event.target.value"
            class="form-textarea mt-1 block w-full border"
            rows="3"
            placeholder="Enter some long form content."
          ></textarea>
        </label>
      </div>
      <div class="text-xl pt-10">
        <label class="block">
          <span class="text-gray-700">Template</span>
          <textarea
            :value="page.template"
            @input="page.template = $event.target.value"
            class="form-textarea mt-1 block w-full border"
            rows="3"
            placeholder="Enter some long form content."
          ></textarea>
        </label>
      </div>
      <div class="text-xl pt-10">
        <label class="block">
          <span class="text-gray-700">Styles</span>
          <textarea
            :value="page.style"
            @input="page.style = $event.target.value"
            class="form-textarea mt-1 block w-full border"
            rows="3"
            placeholder="Enter some long form content."
          ></textarea>
        </label>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import layout from '~/components/layout/Layout'
export default {
  validate({ params }) {
    return /^\w+$/.test(params.id)
  },
  components: {
    layout
  },
  middleware: 'auth',
  data: function({ params }) {
    return {
      page: this.$store.getters.page(this.$route.params.id)
    }
  },
  methods: {
    save: function() {
      const page = this.$data.page

      console.log(page)

      return this.$fireStore
        .collection('projects')
        .doc('7mgD6u0ttGD6ZzIvUxtb')
        .collection('pages')
        .doc(page.id)
        .update({
          template: page.template,
          script: page.script,
          style: page.style
        })
    }
  },

  mounted() {
    this.$store.dispatch('listenPages')
  }
}
</script>

<style></style>

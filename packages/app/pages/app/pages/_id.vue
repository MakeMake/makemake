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

      <div class="pt-10">
        <label class="block">
          <span class="text-gray-700">Script</span>
          <code-block v-model="page.script" mode="text/javascript" />
        </label>
      </div>
      <div class="pt-10">
        <label class="block">
          <span class="text-gray-700">Template</span>
          <code-block v-model="page.template" mode="text/html" />
        </label>
      </div>
      <div class="pt-10">
        <label class="block">
          <span class="text-gray-700">Styles</span>
          <code-block v-model="page.style" mode="text/css" />
        </label>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import layout from '~/components/layout/Layout'
import codeBlock from '~/components/modules/CodeBlock'

export default {
  validate({ params }) {
    return /^\w+$/.test(params.id)
  },
  components: {
    layout,
    codeBlock
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

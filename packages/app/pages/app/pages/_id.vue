<template>
  <layout>
    <div v-if="!page"></div>
    <div v-else>
      <div class="flex justify-between align-items">
        <div>
          <info value="page" color="blue-500" />
          <titleH1 :value="page.name" />
          <div
            class="text-gray-500 font-medium outline-none"
            contenteditable="true"
            @blur="onDescriptionChange"
            v-text="page.description"
          ></div>
        </div>
        <div>
          <button class="button--green" @click="save">Save</button>
        </div>
      </div>

      <div class="pt-10">
        <label class="block">
          <info value="Script" />
          <code-block
            v-model="page.script"
            mode="text/javascript"
            placeholder="Edit the page script"
          />
        </label>
      </div>
      <div class="pt-10">
        <label class="block">
          <info value="Template" />
          <code-block
            v-model="page.template"
            mode="text/html"
            placeholder="Edit the page template"
          />
        </label>
      </div>
      <div class="pt-10">
        <label class="block">
          <info value="Styles" />
          <code-block
            v-model="page.style"
            mode="text/css"
            placeholder="Edit the page style"
          />
        </label>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import layout from '~/components/layout/Layout'
import codeBlock from '~/components/modules/CodeBlock'
import info from '~/components/typography/Info'
import titleH1 from '~/components/typography/TitleH1'

export default {
  validate({ params }) {
    return /^\w+$/.test(params.id)
  },
  components: {
    layout,
    codeBlock,
    info,
    titleH1
  },
  middleware: 'auth',
  data: function({ params }) {
    return {
      page: this.$store.getters.page(this.$route.params.id)
    }
  },
  methods: {
    onDescriptionChange: function(newDescription) {
      this.$data.page.description = newDescription.target.textContent
    },
    save: function() {
      const page = this.$data.page

      console.log(page)

      return this.$fireStore
        .collection('projects')
        .doc('7mgD6u0ttGD6ZzIvUxtb')
        .collection('pages')
        .doc(page.id)
        .update({
          description: page.description,
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

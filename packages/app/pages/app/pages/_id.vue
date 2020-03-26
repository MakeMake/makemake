<template>
  <layout>
    <div v-if="!page"></div>
    <div v-else>
      <div
        class="flex items-center justify-between align-items sticky top-0 bg-white py-2 z-10 border-b-2 border-gray-200 mb-6"
      >
        <div>
          <info value="page" color="blue-500" />
          <titleH1 :value="page.name" class="-mt-4" />
        </div>
        <div>
          <btn :onClick="save">
            <check-circle-icon size="18" class="mr-1 text-green-600">
            </check-circle-icon>
            Save
          </btn>
        </div>
      </div>
      <div
        class="text-gray-500 font-medium outline-none"
        contenteditable="true"
        @blur="onDescriptionChange"
        v-text="page.description"
      ></div>

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
import { CheckCircleIcon } from 'vue-feather-icons'
import layout from '~/components/layout/Layout'
import codeBlock from '~/components/modules/CodeBlock'
import info from '~/components/typography/Info'
import titleH1 from '~/components/typography/TitleH1'
import btn from '~/components/ui/Button'

export default {
  validate({ params }) {
    // return /^\w+$/.test(params.id)
    return true
  },
  components: {
    layout,
    codeBlock,
    info,
    titleH1,
    btn,
    CheckCircleIcon
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

      this.$store.dispatch('updatePage', page)
    }
  },

  mounted() {
    this.$store.dispatch('listenPages')
  }
}
</script>

<style></style>

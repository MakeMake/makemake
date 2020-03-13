<!-- TODO: Add custom hint -->

<template>
  <client-only placeholder="Codemirror Loading...">
    <codemirror
      ref="code"
      :value="this.value"
      :options="codeOptions"
      @ready="onCodemirrorReady"
      @input="onChange"
      :placeholder="this.placeholder"
    ></codemirror>
  </client-only>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/css/css'
import 'codemirror/lib/codemirror.css'

export default {
  components: {
    codemirror
  },
  props: {
    value: String,
    mode: String,
    placeholder: String
  },
  data: function({ params }) {
    return {
      codeOptions: {
        tabSize: 2,
        mode: this.mode,
        lineNumbers: true,
        theme: 'material-darker',
        line: true,
        autoCloseTags: true,
        extraKeys: { 'Ctrl-E': 'autocomplete', 'Cmd-E': 'autocomplete' }
      }
    }
  },
  methods: {
    onChange: function(newCode) {
      this.$emit('input', newCode)
    },
    onCodemirrorReady: function(cm) {
      cm.on('keypress', () => {
        cm.showHint()
      })
    }
  }
}
</script>

<style>
.CodeMirror {
  @apply text-sm font-medium leading-relaxed font-mono px-2 py-4 rounded-md;
  height: auto;
}

/* CodeMirror theme */
.CodeMirror {
  @apply bg-black text-white;
}
div.CodeMirror-selected {
  @apply bg-blue-700 !important;
}
.CodeMirror-gutters {
  @apply bg-black border-r-0;
}
.CodeMirror-linenumber {
  @apply text-gray-700 pr-4;
}
.CodeMirror-cursor {
  @apply border-l-2 border-blue-500;
}
.CodeMirror pre.CodeMirror-placeholder,
span.cm-comment {
  @apply text-gray-700;
}
span.cm-atom {
  @apply text-blue-400;
}
span.cm-number {
  @apply text-blue-400;
}
span.cm-property,
span.cm-attribute {
  @apply text-orange-400;
}
span.cm-keyword {
  @apply text-white;
}
span.cm-string {
  @apply text-green-500;
}
span.cm-variable {
  @apply text-blue-300;
}
span.cm-variable-2 {
  @apply text-blue-300;
}
span.cm-def {
  @apply text-orange-400;
}
span.cm-error {
  @apply bg-red-500 text-red-200;
}
span.cm-tag.cm-bracket {
  @apply text-blue-300;
}
span.cm-tag {
  @apply text-white;
}
span.cm-link {
  @apply text-blue-400;
}
.CodeMirror-matchingbracket {
  @apply underline;
  @apply text-white !important;
}
</style>

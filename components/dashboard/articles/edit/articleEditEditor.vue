<template>
  <div id="h-2/3 m-0">
    <div class="btn-group">
      <label class="inline-block m-0">
        <input
          class="hidden"
          type="radio"
          name="edit"
          value="edit"
          autocomplete="off"
          @change="changeMode"
        />
        <span
          ><img
            class="
              btn-mode
              bg-gray-100
              rounded-tl-lg
              hover:bg-gray-200
              duration-300
              w-6
              h-6
              p-2
            "
            src="./pen.png"
        /></span>
      </label>
      <label class="inline-block m-0">
        <input
          class="hidden"
          type="radio"
          name="edit"
          value="column"
          autocomplete="off"
          @change="changeMode"
          checked
        />
        <span
          ><img
            class="
              btn-mode
              bg-gray-100
              hover:bg-gray-200
              duration-300
              w-6
              h-6
              p-2
            "
            src="./col.png"
        /></span>
      </label>
      <label class="inline-block m-0">
        <input
          class="hidden"
          type="radio"
          name="edit"
          value="view"
          autocomplete="off"
          @change="changeMode"
        />
        <span
          ><img
            class="
              btn-mode
              bg-gray-100
              rounded-tr-lg
              hover:bg-gray-200
              duration-300
              w-6
              h-6
              p-2
            "
            src="./view.png"
        /></span>
      </label>
    </div>
    <textarea
      id="title"
      value="title"
      cols="1"
      class="
        text-xl
        md:text-3xl
        resize-none
        px-6
        py-2
        h-14
        outline-none
        w-full
        bg-gray-50
        overflow-hidden
        whitespace-nowrap
        border-b border-solid
        align-top
      "
      @keydown.enter.prevent
      placeholder="文章標題"
    ></textarea>
    <textarea
      :value="content"
      @input="update"
      @paste='pasteImage'
      class="
        h-screen
        resize-none
        outline-none
        px-6
        py-2
        text-l
        float-left
        bg-gray-50
        align-top
      "
      :class="{
        'inline-block w-1/2': mode === 'column',
        'inline-block w-full': mode === 'edit',
        hidden: mode === 'view',
      }"
    ></textarea>
    <div
      class="
        markdown-wrap
        h-screen
        px-6
        py-0
        overflow-hidden
        float-left
        shadow
        align-top
      "
      v-html="compiledMarkdown"
      :class="{
        'inline-block w-1/2': mode === 'column',
        'inline-block w-full': mode === 'view',
        hidden: mode === 'edit',
      }"
    ></div>
  </div>
</template>
<script>
import marked from "marked";
import _ from "lodash";

export default {
  name: "articleEditEditor",
  props: ["article"],
  data() {
    return {
      content: "# hello",
      mode: "column",
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content);
    },
  },
  methods: {
    update: _.debounce(function (e) {
      this.content = e.target.value;
    }, 300),
    onSubmit(file) {
      let data = new FormData();
      data.append("image", file);
      const config = {
        method: "post",
        url: "https://api.imgur.com/3/upload/",
        headers: {
          Authorization: "Client-ID 14bccf4d421417a",
          "Content-type": "application/json",
        },
        data: data,
      };

      this.$axios(config)
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.data.link)
          //require(response.data.data.link)
          this.content += `\n![](${response.data.data.link})`
          this.update()
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },
    changeMode(e) {
      this.mode = e.target.value;
    },
    pasteImage(e) {
      let items = e.clipboardData && e.clipboardData.items;
      let file = null
      if(items && items.length){
        for(var i =0;i<items.length;i++){
          if(items[i].type.indexOf('image') !== -1){
            file = items[i].getAsFile()
            break
          }
        }
      }
      if(file){
        this.onSubmit(file)
      }
    }
  },
};
</script>
<style scoped>
input:checked + span,
input:checked + span > img {
  background-color: #6a737d;
}

/******************/
/** Markdown CSS **/
/******************/
::v-deep p img {
  width: 100%;
  height: auto;
}

::v-deep details {
  display: block;
}
::v-deep summary {
  display: list-item;
}
::v-deep a {
  background-color: initial;
}
::v-deep a:active,
::v-deep a:hover {
  outline-width: 0;
}
::v-deep strong {
  font-weight: inherit;
  font-weight: bolder;
}
::v-deep h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
::v-deep img {
  border-style: none;
}
::v-deep code,
::v-deep kbd,
::v-deep pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
::v-deep hr {
  box-sizing: initial;
  height: 0;
  overflow: visible;
}
::v-deep input {
  font: inherit;
  margin: 0;
}
::v-deep input {
  overflow: visible;
}
::v-deep [type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}
::v-deep * {
  box-sizing: border-box;
}
::v-deep input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
::v-deep a {
  color: #0366d6;
  text-decoration: none;
}
::v-deep a:hover {
  text-decoration: underline;
}
::v-deep strong {
  font-weight: 600;
}
::v-deep hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
}
::v-deep hr:after,
::v-deep hr:before {
  display: table;
  content: "";
}
::v-deep hr:after {
  clear: both;
}
::v-deep table {
  border-spacing: 0;
  border-collapse: collapse;
}
::v-deep td,
::v-deep th {
  padding: 0;
}
::v-deep details summary {
  cursor: pointer;
}
::v-deep kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #d1d5da;
}
::v-deep h1,
::v-deep h2,
::v-deep h3,
::v-deep h4,
::v-deep h5,
::v-deep h6 {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep h1 {
  font-size: 32px;
}
::v-deep h1,
::v-deep h2 {
  font-weight: 600;
}
::v-deep h2 {
  font-size: 24px;
}
::v-deep h3 {
  font-size: 20px;
}
::v-deep h3,
::v-deep h4 {
  font-weight: 600;
}
::v-deep h4 {
  font-size: 16px;
}
::v-deep h5 {
  font-size: 14px;
}
::v-deep h5,
::v-deep h6 {
  font-weight: 600;
}
::v-deep h6 {
  font-size: 12px;
}
::v-deep p {
  margin-top: 0;
  margin-bottom: 10px;
}
::v-deep blockquote {
  margin: 0;
}
::v-deep ol,
::v-deep ul {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep ol ol,
::v-deep ul ol {
  list-style-type: lower-roman;
}
::v-deep ol ol ol,
::v-deep ol ul ol,
::v-deep ul ol ol,
::v-deep ul ul ol {
  list-style-type: lower-alpha;
}
::v-deep dd {
  margin-left: 0;
}
::v-deep code,
::v-deep pre {
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 12px;
}
::v-deep pre {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep input::-webkit-inner-spin-button,
::v-deep input::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}
::v-deep hr {
  border-bottom-color: #eee;
}
::v-deep kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #d1d5da;
}
::v-deep:after,
::v-deep:before {
  display: table;
  content: "";
}
::v-deep:after {
  clear: both;
}
::v-deep > :first-child {
  margin-top: 0 !important;
}
::v-deep > :last-child {
  margin-bottom: 0 !important;
}
::v-deep a:not([href]) {
  color: inherit;
  text-decoration: none;
}
::v-deep blockquote,
::v-deep details,
::v-deep dl,
::v-deep ol,
::v-deep p,
::v-deep pre,
::v-deep table,
::v-deep ul {
  margin-top: 0;
  margin-bottom: 16px;
}
::v-deep hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
::v-deep blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
::v-deep blockquote > :first-child {
  margin-top: 0;
}
::v-deep blockquote > :last-child {
  margin-bottom: 0;
}
::v-deep h1,
::v-deep h2,
::v-deep h3,
::v-deep h4,
::v-deep h5,
::v-deep h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}
::v-deep h1 {
  font-size: 2em;
}
::v-deep h1,
::v-deep h2 {
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}
::v-deep h2 {
  font-size: 1.5em;
}
::v-deep h3 {
  font-size: 1.25em;
}
::v-deep h4 {
  font-size: 1em;
}
::v-deep h5 {
  font-size: 0.875em;
}
::v-deep h6 {
  font-size: 0.85em;
  color: #6a737d;
}
::v-deep ol,
::v-deep ul {
  padding-left: 2em;
}
::v-deep ol ol,
::v-deep ol ul,
::v-deep ul ol,
::v-deep ul ul {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep li {
  word-wrap: break-all;
}
::v-deep li > p {
  margin-top: 16px;
}
::v-deep li + li {
  margin-top: 0.25em;
}
::v-deep dl {
  padding: 0;
}
::v-deep dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}
::v-deep dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}
::v-deep table {
  display: block;
  width: 100%;
  overflow: auto;
}
::v-deep table th {
  font-weight: 600;
}
::v-deep table td,
::v-deep table th {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}
::v-deep table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}
::v-deep table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
::v-deep img {
  max-width: 100%;
  box-sizing: initial;
}
::v-deep img:not(.btn-mode) {
  background-color: #fff;
}
::v-deep img[align="right"] {
  padding-left: 20px;
}
::v-deep img[align="left"] {
  padding-right: 20px;
}
::v-deep code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
::v-deep pre {
  word-wrap: normal;
}
::v-deep pre > code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}
::v-deep pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
::v-deep pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: initial;
  border: 0;
}
</style>
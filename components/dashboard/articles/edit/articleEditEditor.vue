<template>
  <div class="h-2/3 mx-0 mt-24">
    <div class="btn-group w-full bg-primary text-center">
      <label class="inline-block mx-0 my-auto">
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
            class="btn-mode bg-white hover:bg-gray-200 duration-300 w-8 h-8 p-2"
            src="./pen.png"
        /></span>
      </label>
      <label class="inline-block mx-0 my-auto">
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
            class="btn-mode bg-white hover:bg-gray-200 duration-300 w-8 h-8 p-2"
            src="./col.png"
        /></span>
      </label>
      <label class="inline-block mx-0 my-auto">
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
            class="btn-mode bg-white hover:bg-gray-200 duration-300 w-8 h-8 p-2"
            src="./view.png"
        /></span>
      </label>
    </div>
    <textarea
      :value="content"
      @input="update"
      @paste="pasteImage"
      ref="markdownRef"
      class="
        h-screen
        resize-none
        outline-none
        px-6
        py-4
        text-l
        md:text-xl
        text-white
        bg-gray-900
        font-bold
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
        py-4
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
    onSubmit(file, cursorPosition) {
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
        .then(
          function (response) {
            console.log(response.data);
            console.log(response.data.data.link);
            //require(response.data.data.link)
            this.content =
              this.content.substring(0, cursorPosition) +
              `\n![](${response.data.data.link})` +
              this.content.substring(cursorPosition, this.content.length);
            this.update();
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    changeMode(e) {
      this.mode = e.target.value;
    },
    pasteImage(e) {
      let markdownRef = this.$refs.markdownRef;
      let cursorPosition = markdownRef.selectionStart;
      let items = e.clipboardData && e.clipboardData.items;
      let file = null;
      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      if (file) {
        this.onSubmit(file, cursorPosition);
      }
    },
  },
};
</script>
<style scoped>
input:checked + span,
input:checked + span > img {
  @apply bg-primary;
}

/******************/
/** Markdown CSS **/
/******************/
.markdown-wrap {
  font-family: "Source Han Serif TC";
  @apply text-primary font-bold;
}
::v-deep .markdown-wrap p img {
  width: 100%;
  height: auto;
}

::v-deep .markdown-wrap details {
  display: block;
}
::v-deep .markdown-wrap summary {
  display: list-item;
}
::v-deep .markdown-wrap a {
  background-color: initial;
}
::v-deep .markdown-wrap a:active,
::v-deep .markdown-wrap a:hover {
  outline-width: 0;
}
::v-deep .markdown-wrap strong {
  font-weight: inherit;
  font-weight: bolder;
}
::v-deep .markdown-wrap h1 {
  font-size: 3em;
  margin: 0.67em 0;
}
::v-deep .markdown-wrap img {
  border-style: none;
}
::v-deep .markdown-wrap code,
::v-deep .markdown-wrap kbd,
::v-deep .markdown-wrap pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
::v-deep .markdown-wrap hr {
  box-sizing: initial;
  height: 0;
  overflow: visible;
}
::v-deep .markdown-wrap input {
  font: inherit;
  margin: 0;
}
::v-deep .markdown-wrap input {
  overflow: visible;
}
::v-deep .markdown-wrap [type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}
::v-deep .markdown-wrap * {
  box-sizing: border-box;
}
::v-deep .markdown-wrap input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
::v-deep .markdown-wrap a {
  color: #0366d6;
  text-decoration: none;
}
::v-deep .markdown-wrap a:hover {
  text-decoration: underline;
}
::v-deep .markdown-wrap strong {
  font-weight: 600;
}
::v-deep .markdown-wrap hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
}
::v-deep .markdown-wrap hr:after,
::v-deep .markdown-wrap hr:before {
  display: table;
  content: "";
}
::v-deep .markdown-wrap hr:after {
  clear: both;
}
::v-deep .markdown-wrap table {
  border-spacing: 0;
  border-collapse: collapse;
}
::v-deep .markdown-wrap td,
::v-deep .markdown-wrap th {
  padding: 0;
}
::v-deep .markdown-wrap details summary {
  cursor: pointer;
}
::v-deep .markdown-wrap kbd {
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
::v-deep .markdown-wrap h1,
::v-deep .markdown-wrap h2,
::v-deep .markdown-wrap h3,
::v-deep .markdown-wrap h4,
::v-deep .markdown-wrap h5,
::v-deep .markdown-wrap h6 {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .markdown-wrap h1,
::v-deep .markdown-wrap h2,
::v-deep .markdown-wrap h3,
::v-deep .markdown-wrap h4,
::v-deep .markdown-wrap h5,
::v-deep .markdown-wrap h6 {
  font-weight: 600;
}
::v-deep .markdown-wrap h1 {
  font-size: 48px;
}
::v-deep .markdown-wrap h2 {
  font-size: 24px;
}
::v-deep .markdown-wrap h3 {
  font-size: 20px;
}
::v-deep .markdown-wrap h4 {
  font-size: 16px;
}
::v-deep .markdown-wrap h5 {
  font-size: 14px;
}
::v-deep .markdown-wrap h6 {
  font-size: 12px;
}
::v-deep .markdown-wrap p {
  margin-top: 0;
  margin-bottom: 10px;
}
::v-deep .markdown-wrap blockquote {
  margin: 0;
}
::v-deep .markdown-wrap ol,
::v-deep .markdown-wrap ul {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .markdown-wrap ol ol,
::v-deep .markdown-wrap ul ol {
  list-style-type: lower-roman;
}
::v-deep .markdown-wrap ol ol ol,
::v-deep .markdown-wrap ol ul ol,
::v-deep .markdown-wrap ul ol ol,
::v-deep .markdown-wrap ul ul ol {
  list-style-type: lower-alpha;
}
::v-deep .markdown-wrap dd {
  margin-left: 0;
}
::v-deep .markdown-wrap code,
::v-deep .markdown-wrap pre {
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 12px;
}
::v-deep .markdown-wrap pre {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .markdown-wrap input::-webkit-inner-spin-button,
::v-deep .markdown-wrap input::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}
::v-deep .markdown-wrap hr {
  border-bottom-color: #eee;
}
::v-deep .markdown-wrap kbd {
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
::v-deep .markdown-wrap:after,
::v-deep .markdown-wrap:before {
  display: table;
  content: "";
}
::v-deep .markdown-wrap:after {
  clear: both;
}
::v-deep .markdown-wrap > :first-child {
  margin-top: 0 !important;
}
::v-deep .markdown-wrap > :last-child {
  margin-bottom: 0 !important;
}
::v-deep .markdown-wrap a:not([href]) {
  color: inherit;
  text-decoration: none;
}
::v-deep .markdown-wrap blockquote,
::v-deep .markdown-wrap details,
::v-deep .markdown-wrap dl,
::v-deep .markdown-wrap ol,
::v-deep .markdown-wrap p,
::v-deep .markdown-wrap pre,
::v-deep .markdown-wrap table,
::v-deep .markdown-wrap ul {
  margin-top: 0;
  margin-bottom: 16px;
}
::v-deep .markdown-wrap hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
::v-deep .markdown-wrap blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
::v-deep .markdown-wrap blockquote > :first-child {
  margin-top: 0;
}
::v-deep .markdown-wrap blockquote > :last-child {
  margin-bottom: 0;
}
::v-deep .markdown-wrap h1,
::v-deep .markdown-wrap h2,
::v-deep .markdown-wrap h3,
::v-deep .markdown-wrap h4,
::v-deep .markdown-wrap h5,
::v-deep .markdown-wrap h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}
::v-deep .markdown-wrap h1 {
  font-size: 3em;
}
::v-deep .markdown-wrap h2 {
  font-size: 2em;
}
::v-deep .markdown-wrap h3 {
  font-size: 1.75em;
}
::v-deep .markdown-wrap h4 {
  font-size: 1.5em;
}
::v-deep .markdown-wrap h5 {
  font-size: 1em;
}
::v-deep .markdown-wrap h6 {
  font-size: 0.85em;
  color: #6a737d;
}
::v-deep .markdown-wrap ol,
::v-deep .markdown-wrap ul {
  padding-left: 2em;
}
::v-deep .markdown-wrap ol ol,
::v-deep .markdown-wrap ol ul,
::v-deep .markdown-wrap ul ol,
::v-deep .markdown-wrap ul ul {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .markdown-wrap li {
  word-wrap: break-all;
  list-style: circle;
}
::v-deep .markdown-wrap li > p {
  margin-top: 16px;
}
::v-deep .markdown-wrap li + li {
  margin-top: 0.25em;
}
::v-deep .markdown-wrap dl {
  padding: 0;
}
::v-deep .markdown-wrap dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}
::v-deep .markdown-wrap dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}
::v-deep .markdown-wrap table {
  display: block;
  width: 100%;
  overflow: auto;
}
::v-deep .markdown-wrap table th {
  font-weight: 600;
}
::v-deep .markdown-wrap table td,
::v-deep .markdown-wrap table th {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}
::v-deep .markdown-wrap table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}
::v-deep .markdown-wrap table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
::v-deep .markdown-wrap img {
  max-width: 100%;
  box-sizing: initial;
}
::v-deep .markdown-wrap img:not(.btn-mode) {
  background-color: #fff;
}
::v-deep .markdown-wrap img[align="right"] {
  padding-left: 20px;
}
::v-deep .markdown-wrap img[align="left"] {
  padding-right: 20px;
}
::v-deep .markdown-wrap code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
::v-deep .markdown-wrap pre {
  word-wrap: normal;
}
::v-deep .markdown-wrap pre > code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}
::v-deep .markdown-wrap pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
::v-deep .markdown-wrap pre code {
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
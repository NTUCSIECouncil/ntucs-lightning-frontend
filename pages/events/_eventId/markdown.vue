<template>
  <div
    class="card break-words container w-3/4 mx-auto mb-12"
    v-html="compiledMarkdown"
  ></div>
</template>
<script>
import marked from "marked";

export default {
  name: "markdown",
  props: {
    data: { type: String },
  },
  computed: {
    compiledMarkdown() {
      return marked(this.data);
    },
  },
  beforeMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });
  },
};
</script>
<style scoped>
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
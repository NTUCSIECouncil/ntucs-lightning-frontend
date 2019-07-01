import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

const defaultOptions = {
  allowedTags: ['h3', 'h4', 'h5', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'div', 'pre'
  ],
  allowedAttributes: {
    a: [ 'href' ],
    img: [ 'src' ],
    p: [ 'style' ]
  }
}

Vue.use(VueSanitize, defaultOptions)

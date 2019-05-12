import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

const defaultOptions = {
  allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div'
  ],
  allowedAttributes: {
    a: [ 'href' ],
    img: [ 'src' ],
    p: [ 'style' ]
  }
}

Vue.use(VueSanitize, defaultOptions)

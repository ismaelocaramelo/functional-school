const CDN = (path) => `https://cdnjs.cloudflare.com/ajax/libs/${path}`
const ramda = CDN('ramda/0.27.0/ramda.min')
const jquery = CDN('jquery/3.5.0/jquery.min')

// map's composition law
// compose(map(f), map(g)) === map(compose(f,g))

requirejs.config({paths: {ramda, jquery}})

requirejs(['jquery', 'ramda'], ($, {compose, curry, map, prop}) => {
  // -- Utils ----------------------------------------------------------
  const Impure = {
    trace: curry((tag, x) => {
      console.log(tag, x)
      return x
    }),
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHtml: curry((sel, html) => $(sel).html(html)),
  }

  // -- Pure -----------------------------------------------------------
  const host = 'api.flickr.com'
  const path = '/services/feeds/photos_public.gne'
  const query = (t) => `?tags=${t}&format=json&jsoncallback=?`
  const url = (t) => `https://${host}${path}${query(t)}`

  const img = (src) => $('<img />', {src})
  const mediaUrl = compose(prop('m'), prop('media'))
  const mediaToImg = compose(img, mediaUrl)
  const images = compose(map(mediaToImg), prop('items'))

  const render = compose(Impure.setHtml('#js-main'), images)
  const app = compose(Impure.getJSON(render), url)

  app('dogs')
})

const Shortcode = require("shortcode-parser");

const shortcodes = {
  // image: (str, params) => {
  //   const figText = `${params.caption || ''}${params.attribution ? ' (' + params.attribution + ')' : ''}`;
  //   const figOpen = params.caption || params.attribution ? '<figure>' : '';
  //   const figClose = params.caption || params.attribution ? `<figcaption>${figText}</figcaption></figure>` : '';
  //   const lightbox = params.lightbox ? 'on="tap:lightbox1" role="button" tabindex="0"' : '';
  //   return `<div>${figOpen}<amp-img
  //               width=${params.width || 1}
  //               height=${params.height || 1}
  //               src="/${config.media}/${config.images.small.prefix}${params.name}"
  //               srcset="/${config.media}/${config.images.large.prefix}${params.name} ${config.images.large.size},
  //               /${config.media}/${config.images.medium.prefix}${params.name} ${config.images.medium.size},
  //               /${config.media}/${config.images.small.prefix}${params.name} ${config.images.small.size}"
  //               alt="${params.alttext || ''}"
  //               attribution="${params.attribution || ''}" ${lightbox}
  //               layout="responsive"></amp-img/>${figClose}</div>`;
  // },
  // video: (str, params) =>
  //   `<div><amp-video
  //     layout="responsive"
  //     width=${params.width || 16}
  //     height=${params.height || 9}
  //     ${params.autoplay ? 'autoplay' : ''}
  //     ${params.loop ? 'loop' : ''}
  //      src="${params.url || ''}"
  //      poster="${params.poster || ''}">
  //        <div fallback>
  //          <p>Your browser doesn’t support HTML5 video</p>
  //        </div>
  //   </amp-video></div>`,
  // gif: (str, params) =>
  //   `<div><amp-anim
  //     layout="responsive"
  //     width=${params.width || 1}
  //     height=${params.height || 1}
  //     src="/${config.media}/${params.name}">
  //     <amp-img
  //     placeholder
  //     layout="responsive"
  //     width=${params.width || 1}
  //     height=${params.height || 1}
  //     src="/${config.media}/placeholder-${params.name}">
  //     </amp-img>
  //   </amp-anim></div>`,
  // audio: (str, params) =>
  //   `<div><amp-audio
  //     src="${params.url}">
  //     <div fallback>
  //     <p>Your browser doesn’t support HTML5 audio</p>
  //     </div>
  //     <source type="audio/mpeg" src="foo.mp3">
  //     <source type="audio/ogg" src="foo.ogg">
  //   </amp-audio></div>`,
  soundcloud: (str, params) =>
    `<div><amp-soundcloud
        height=${params.height || 166}
        layout="fixed-height"
        ${params.color && !params.visual ? `data-color="${params.color}"` : ""}
        data-trackid="${params.id}"
        ${params.visual ? 'data-visual="true"' : ""}>
      </amp-soundcloud></div>`,
  carousel: (str, params) =>
    `<div><amp-carousel
              type="slides"
              layout="responsive"
              controls
              width=${params.width || 4}
              height=${params.height || 3}>
        ${str}
      </amp-carousel></div>`,
  facebook: (str, params) =>
    `<div><amp-facebook width=16 height=9
        layout="responsive"
        data-embed-as="${params.type || "post"}"
        data-href="${params.url}">
      </amp-facebook></div>`,
  fittext: (str, params) =>
    `<div><amp-fit-text
          width=${params.width || 4}
          height=${params.height || 3}
          min-font-size=${params.min || 10}
          max-font-size=${params.max || 52}
          layout="responsive">
        ${str}
      </amp-fit-text></div>`,
  iframe: (str, params) =>
    `<div><amp-iframe
                sandbox="allow-scripts allow-same-origin"
                src="${params.url || ""}"
                width=${params.width || 1}
                height=${params.height || 1}
                layout="responsive">
             </amp-fit-text></div>`,
  instagram: (str, params) =>
    `<div><amp-instagram
                data-shortcode="${params.shortcode || ""}"
                width=${params.width || 1}
                height=${params.height || 1}
                layout="responsive">
             </amp-instagram></div>`,
  twitter: (str, params) =>
    `<div><amp-twitter
                data-tweetid="${params.tweetid || ""}"
                width=${params.width || 400}
                height=${params.height || 600}
                data-cards="hidden">
             </amp-twitter></div>`,
  vine: (str, params) =>
    `<div><amp-vine
        data-vineid="${params.vineid || ""}"
        width=${params.width || 400}
        height=${params.height || 400}>
        layout="responsive">
      </amp-vine></div>`,
  vimeo: (str, params) =>
    `<div><amp-vimeo
        data-videoid="${params.videoid || ""}"
        width=${params.width || 500}
        height=${params.height || 281}
        layout="responsive">
      </amp-vimeo></div>`,
  youtube: (str, params) =>
    `<div><amp-youtube
        data-videoid="${params.videoid || ""}"
        width=${params.width || 480}
        height=${params.height || 270}
        layout="responsive">
      </amp-youtube></div>`
};

for (let s in shortcodes) {
  Shortcode.add(s, shortcodes[s]);
}

module.exports = text => Shortcode.parse(text);

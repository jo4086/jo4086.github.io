const injectConfig = {
    meta: [
        { name: 'author', content: 'jo4086' },
        { name: 'description', content: 'jo4086 기술 블로그' },
        { name: 'theme-color', content: '#333' },
        { name: 'keywords', content: 'HTML,CSS, JS, UINAMIC, JO4086, blog' },
    ],
    baseUrl: '.',
    links: [
        {
            rel: 'stylesheet',
            path: 'src/styles',
            files: ['color.css', 'global.css', 'index.css'],
        },
    ],
    scripts: [
        {
            type: 'module',
            path: '.',
            files: ['head.script.js', 'body.script.js', 'lazyLoad.script.js', 'DomContent.script.js'],
        },
    ],
}

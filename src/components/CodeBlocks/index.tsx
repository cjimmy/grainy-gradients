import hljs from 'highlight.js/lib/core';
import cssLang from 'highlight.js/lib/languages/css';
import xmlLang from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('css', cssLang);
hljs.registerLanguage('xml', xmlLang);

export * from './Svg';
export * from './Css';
export * from './Filter';

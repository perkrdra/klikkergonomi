import html from './index.html';
import css from './style.css';
import js from './app.js';
const files = new Map([
  ['/', [html, 'text/html; charset=utf-8']],
  ['/index.html', [html, 'text/html; charset=utf-8']],
  ['/style.css', [css, 'text/css; charset=utf-8']],
  ['/app.js', [js, 'application/javascript; charset=utf-8']],
]);
export default {
  fetch(request) {
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405, headers:{Allow:'GET, HEAD'}});
    const file = files.get(new URL(request.url).pathname);
    if (!file) return new Response('Ikke funnet', {status:404});
    return new Response(request.method === 'HEAD' ? null : file[0], {headers:{
      'Content-Type':file[1],
      'X-Content-Type-Options':'nosniff',
      'Referrer-Policy':'strict-origin-when-cross-origin',
      'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      'Cache-Control':'public, max-age=0, must-revalidate'
    }});
  }
};

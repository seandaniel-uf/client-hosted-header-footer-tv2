## This is an example of an Uberflip client-hosted header and footer with details on the structure of the endpoint, specifically where to place HTML, CSS, JavaScript and other assets in the necessary object keys.

Endpoint Example: [https://seandaniel-uf.github.io/client-hosted-header-footer-tv2/headerFooterEndPoint.js](https://seandaniel-uf.github.io/client-hosted-header-footer-tv2/headerFooterEndPoint.js)

The structure of the endpoint consists of:

`head_section_html` -> Links to CSS, Font Files, Other necessary assets loaded through a CDN

`header_html` -> The header's HTML which will be manipulated by CSS, JavaScript

`footer_html` -> The footer HTML which will be manipulated by CSS, potentially JavaScript (If your footer has JavaScript functionality). This also includes a script tag containing JavaScript for the header and footer, placed at the end of the `</footer>` tag which will be placed at `</body>` bottom. 

# Example of an Uberflip client-hosted header and footer
### Below contains details on the structure of the endpoint, specifically where to place HTML, CSS, JavaScript and other assets in the necessary object keys.

Endpoint Example: [https://seandaniel-uf.github.io/client-hosted-header-footer-tv2/headerFooterEndPoint.js](https://seandaniel-uf.github.io/client-hosted-header-footer-tv2/headerFooterEndPoint.js)

The structure of the endpoint consists of one global object named to your choice (in my example I chose `companyCode`) followed by three seperate keys. The three keys in the `companyCode` object should be named accordingly as I have referenced below, and HTML, CSS, JavaScript placed in the necessary keys.

`head_section_html` -> Links to CSS, Font Files, Other necessary assets loaded through a CDN - [Example Code when appended into the DOM](https://github.com/seandaniel-uf/client-hosted-header-footer-tv2/blob/master/head_section_html.html)

`header_html` -> The header HTML - [Example code when appended into the DOM](https://github.com/seandaniel-uf/client-hosted-header-footer-tv2/blob/master/header.html)

`footer_html` -> The footer HTML, a script tag containing JavaScript for the header and footer placed just inside the end of the closing tag of your footer which will be placed at `</body>` bottom - [Example code when appended into the DOM](https://github.com/seandaniel-uf/client-hosted-header-footer-tv2/blob/master/footer.html)

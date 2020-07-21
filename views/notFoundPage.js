const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
<h3>HTTP 404 NOT FOUND</h3>
`);
const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (err) => layout(html`
<h3>HTTP 500 INTERNAL SERVER ERROR</h3>
<h4>${err}</h4>
`);
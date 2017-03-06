// copy the en-GB content as default content, and make sure to remove the `<base>` tag from the index
var fs = require("fs-extra");

// only copy the index and article - static assets are already in the right place!
fs.copySync("en-GB/index.html", "index.html");
fs.copySync("en-GB/article.js", "article.js");

// small update to make sure JSX className is class:
var html = fs.readFileSync("index.html").toString();
html = html.replace('className=', 'class=');

// small injection to make code know this is not a specifically localised page
html = html.replace('</title>', "</title>\n    <script>window['no locale was set for the primer'] = true;</script>");

// And an edit notice so people don't accidentally edit index.html
html = "<!-- AUTOGENERATED CONTENT, PLEASE EDIT 'index.template.html' INSTEAD! -->\n" + html;
fs.writeFileSync("index.html", html);

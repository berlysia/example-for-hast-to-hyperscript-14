const { createElement, Component } = require("react");
const { render } = require("react-dom");
const unified = require("unified");
const md2mdast = require("remark-parse");
const mdast2hast = require("remark-rehype");
const hast2hyperscript = require("hast-to-hyperscript");

const CHECKED = "- [x] checked";
const UNCHECKED = "- [ ] unchecked";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { source: UNCHECKED };
    this.assignCheckedMarkdown = this.assignCheckedMarkdown.bind(this);
    this.assignUncheckedMarkdown = this.assignUncheckedMarkdown.bind(this);
  }
  assignCheckedMarkdown() {
    this.setState({ source: CHECKED });
  }
  assignUncheckedMarkdown() {
    this.setState({ source: UNCHECKED });
  }
  render() {
    return createElement(
      "div",
      null,
      createElement("h1", null, "React"),
      createElement(
        "button",
        { onClick: this.assignCheckedMarkdown },
        "change to checked markdown"
      ),
      createElement(
        "button",
        { onClick: this.assignUncheckedMarkdown },
        "change to unchecked markdown"
      ),
      unified()
        .use(md2mdast)
        .use(mdast2hast)
        .use(function() {
          this.Compiler = function(hast) {
            return hast2hyperscript(createElement, hast);
          };
        })
        .processSync(this.state.source).contents
    );
  }
}

render(createElement(Root), document.querySelector("#root"));

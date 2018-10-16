const { createElement, Component } = require("react");
const { render } = require("react-dom");
const hast2hyperscript = require("hast-to-hyperscript");

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({ checked: !this.state.checked });
  }
  render() {
    return createElement(
      "div",
      null,
      createElement("h1", null, "React"),
      createElement(
        "button",
        { onClick: this.onClick },
        "toggle(at first time logged error)"
      ),
      hast2hyperscript(createElement, {
        type: "element",
        tagName: "input",
        properties: {
          type: "checkbox",
          checked: this.state.checked
        }
      })
    );
  }
}

render(createElement(Root), document.querySelector("#root"));

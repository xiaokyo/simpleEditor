import { createElement } from "./utils";

import "./index.less";

class Editor {
  private options: Editor.options;
  private dom: HTMLDivElement | null;
  constructor(options: Editor.options) {
    this.options = options;
    const { el } = options;
    this.dom = document.querySelector(el);

    this.init();
  }

  attr(key: string, value: string) {
    this.dom?.setAttribute(key, value);
  }

  init() {
    this.attr("contenteditable", "true");
    this.attr("class", "KEditor");

    const that = this;

    this.dom?.before(
      createElement("button", "bold", that.setBold.bind(that)),
      createElement("button", "color", that.setColor.bind(that)),
      createElement("button", "bgColor", that.setBgColor.bind(that)),
      createElement("button", "alertHtml", that.getHtml.bind(that)),
      createElement("button", "alertText", that.getText.bind(that))
    );
  }

  exec(cmd: string, showUI: boolean = false, value: string = "") {
    document.execCommand(cmd, showUI, value);
  }

  setBold() {
    this.exec("bold");
  }

  setColor() {
    const color = prompt("请输入颜色") ?? "#000";
    this.exec("foreColor", false, color);
  }

  setBgColor() {
    const color = prompt("请输入颜色") ?? "#000";
    this.exec("backColor", true, color);
    console.log("setBgColor", color);
  }

  getHtml() {
    const html = this.dom?.innerHTML;
    alert(html);
    return html;
  }

  getText() {
    const text = this.dom?.innerText;
    alert(text);
    return text;
  }
}

const editor = new Editor({
  el: "#KEditor",
});

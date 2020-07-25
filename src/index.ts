import { createElement } from "./utils";

import "./index.less";

class Editor {
  private options: Editor.options;
  private dom: HTMLDivElement | null;
  private selection: Selection | null | undefined;
  private range: Range | undefined;

  constructor(options: Editor.options) {
    this.options = options;
    const { el } = options;
    this.dom = document.querySelector(el);
    this.selection = window.getSelection();
    this.init();
  }

  attr(key: string, value: string) {
    this.dom?.setAttribute(key, value);
  }

  exec(cmd: string, showUI: boolean = false, value: string = "") {
    document.execCommand(cmd, showUI, value);
  }

  setRange() {
    const { selection } = this;
    if (selection && !selection?.isCollapsed) {
      const range = selection?.getRangeAt(0);
      console.log("selection", selection?.toString(), selection, range);
      this.range = range;
    }
  }

  recoverRange() {
    const { selection, range } = this;

    if (selection && range) {
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection?.addRange(range.cloneRange());
    }
  }

  init() {
    const that = this;

    that.attr("contenteditable", "true");
    that.attr("class", "KEditor");

    that.dom?.before(
      createElement("button", "bold", that.setBold.bind(that)),
      createElement("button", "color", that.setColor.bind(that)),
      createElement("button", "bgColor", that.setBgColor.bind(that)),
      createElement("button", "alertHtml", that.getHtml.bind(that)),
      createElement("button", "alertText", that.getText.bind(that))
    );

    //
    that.dom?.addEventListener("blur", () => {
      that.setRange();
    });
  }

  setBold() {
    this.recoverRange();
    this.exec("bold");
  }

  setColor() {
    this.recoverRange();
    const color = prompt("请输入颜色") ?? "#000";
    this.exec("foreColor", false, color);
  }

  setBgColor() {
    this.recoverRange();
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

/**
 *  创建一个编辑器工具按钮
 * @param tagName createToolbutton
 */
export const createElement = (
  tagName: string,
  text: string,
  click: Function
): HTMLElement => {
  const element = document.createElement(tagName);
  element.onclick = function (this: GlobalEventHandlers, ev: MouseEvent) {
    click && click(this);
  };
  element.innerText = text;
  return element;
};

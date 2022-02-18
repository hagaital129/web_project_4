export default class Section {
  constructor({renderer}, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // renderer() {
  //   this._renderedItems.forEach(item => this._renderer(item));
  // }
  renderer(items) {
    items.forEach(item =>  this._renderer(item)
    );
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
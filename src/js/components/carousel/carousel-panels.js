"use strict";

export default class CarouselPanels {
  constructor(options = {}) {
    options = Object.assign(
      {
        currentIndex: options.initialIndex,
        length: options.panels.length
      },
      options
    );
    this.options = options;
    this.options.gutter = this.getPanelWidth();
    this.setup();
  }
  setup() {
    this.setupCalculatorSize();
  }
  setupCalculatorSize() {
    this.options.panel.style.width =
      this.options.gutter * this.options.length + "px";
  }
  getPanelWidth() {
    return this.options.el.clientWidth;
  }
  isAtEnd() {
    console.log(this.options.currentIndex);
    return this.options.length - 1 === this.options.currentIndex;
  }
  isAtStart() {
    return this.options.currentIndex === 0;
  }
  getTotalItems() {
    return this.options.length;
  }
  getCurrentIndex() {
    return this.options.currentIndex;
  }
  setCurrentIndex(index) {
    this.options.currentIndex = index;
  }
  getPanelGutter() {
    return this.options.gutter;
  }
}

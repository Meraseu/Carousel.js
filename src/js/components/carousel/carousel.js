"use strict";

import CarouselPanels from "./carousel-panels";
import CarouselArrows from "./carousel-arrows";

export default class Carousel {
  constructor(selector = ".carousel", options = {}) {
    this.selector = document.querySelector(selector);
    if (!this.selector) {
      return;
    }
    options = Object.assign(
      {
        el: this.selector,
        container: this.selector.querySelector(".carousel-container"),
        panel: this.selector.querySelector(".carousel-items"),
        panels: this.selector.querySelectorAll(".carousel-item"),
        leftArrow: this.selector.querySelector(".carousel-arrow-left"),
        rightArrow: this.selector.querySelector(".carousel-arrow-right"),
        initialIndex: 0
      },
      options
    );
    this.options = options;
    this.subModules = {};
    this.setup();
  }
  setup() {
    if (!this.subModules.panels) {
      this.subModules.panels = this.setupPanels(this.options);
    }
    if (
      (this.options.leftArrow || this.options.rightArrow) &&
      !this.subModules.arrows
    ) {
      this.subModules.arrows = this.setupArrows(this.options);
    }
  }
  setupPanels(options) {
    if (options.panels.length) {
      return new CarouselPanels(Object.assign({}, options));
    }
  }
  setupArrows(options) {
    options = Object.assign(
      {
        onLeftArrowClick: this.onLeftArrowClick.bind(this),
        onRightArrowClick: this.onRightArrowClick.bind(this)
      },
      options
    );
    return new CarouselArrows(options);
  }
  getDirection(e) {
    return e.target.classList.contains("carousel-arrow-left") ? "+" : "-";
  }
  onLeftArrowClick(e) {
    this.goTo(this.getDirection(e));
  }
  onRightArrowClick(e) {
    this.goTo(this.getDirection(e));
  }
  goTo(direction) {
    let index = 0;
    if (direction === "+" && this.subModules.panels.isAtStart()) {
      index = this.subModules.panels.getTotalItems() - 1;
    } else if (direction === "-" && this.subModules.panels.isAtEnd()) {
      index = 0;
    } else {
      index =
        direction === "-"
          ? this.subModules.panels.getCurrentIndex() + 1
          : this.subModules.panels.getCurrentIndex() - 1;
    }
    this.subModules.panels.setCurrentIndex(index);
    this.options.panel.style.marginLeft =
      "-" + index * this.subModules.panels.getPanelGutter() + "px";
  }
}

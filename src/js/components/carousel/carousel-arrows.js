"use strict";

export default class CarouselArrows {
  constructor(options = {}) {
    options = Object.assign(
      {
        leftArrow: null,
        rightArrow: null
      },
      options
    );
    if (!options.leftArrow && !options.rightArrow) {
      console.error("Carousel Arrow Error");
    }
    this.options = options;
    if (options.leftArrow) {
      this.leftArrowEventListener = e => this.onLeftArrowClick(e);
      options.leftArrow.addEventListener("click", this.leftArrowEventListener);
    }
    if (options.rightArrow) {
      this.rightArrowEventListener = e => this.onRightArrowClick(e);
      options.rightArrow.addEventListener(
        "click",
        this.rightArrowEventListener
      );
    }
  }
  onLeftArrowClick(e) {
    if (this.options.onLeftArrowClick) {
      this.options.onLeftArrowClick(e);
    }
  }
  onRightArrowClick(e) {
    if (this.options.onRightArrowClick) {
      this.options.onRightArrowClick(e);
    }
  }
}

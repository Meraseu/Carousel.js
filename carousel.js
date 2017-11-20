;(function($) {    
	$.Carousel = function(element, options) {
	    if(!element) {
		  return false;
	    }
        var carousel = this;
        options = options || {};
	    var opts = {
            width : 360,
            padding : 136,
            duration : 500,
            index : (options.index - 1) || 0
        }
	    var $this = $(element),
            $view = $this.find('.carousel-view'),
            $viewContainer = $view.find('.carousel-view-container'),
            $viewContainerWidth = $viewContainer.width(),
            $viewItems = $view.find('.item'),
            $nav = $this.find('.carousel-nav'),
            $navWidth = 0,
            $navItems = $nav.find('li'),
            $navItemsWidth = $navItems.filter(':eq(0)').width(),
            $navItemsMargin = parseInt($navItems.filter(':eq(0)').css('margin-right'),10),
            $navButtons = $nav.find('button'),
            $buttons = $this.find('> .button'),
            $total = $viewItems.length,
            $endMargin = -((($total - 3) * opts.width) + (opts.padding * 2)),
            $direction = '',
            $current = opts.index,
            $breakPoint = [],
            $breakPointIndex = 0,
            $containerWidth = $this.width(),
            $navSlideWidth = 0;
	    carousel.init = function() {
            var $containerWidth = $this.width();
            var $navItemWidth = $navItems.filter(':eq(0)').width();
            var $margin = parseInt($navItems.filter(':eq(0)').css('margin-right').replace("px", ""));
            var sum = 0;
            $viewContainer.css('width', (opts.width * $total));
            $viewItems.each(function(i) {
                $(this).css('width', opts.width);
                sum += $navItemWidth + $margin;
                if(sum > $containerWidth) {
                    console.log($breakPointIndex + 1);
                    $breakPoint.push(($breakPointIndex === 0) ? i : i - ($breakPointIndex + 1));
                    $breakPointIndex++;
                    sum = $navItemWidth + $margin;
                }
            });
            console.log($breakPoint);
            $breakPointIndex = 0;
            $navButtons.each(function(i) {
                if(i === $breakPoint[$breakPointIndex]) {
                    $breakPointIndex++;
                }
                $(this).attr('data-breakpoint',$breakPointIndex);
            });
            $breakPointIndex = 0;
            $navSlideWidth = ($navItemWidth + $margin) * ($breakPoint[0] - 1);
            var scrollSize = 0;
            var offsetSize = 0;
            $nav.addClass('nowrap');
            scrollSize = $nav[0].scrollHeight;
            offsetSize = $nav[0].offsetHeight;
            $nav.removeClass('nowrap');
            if(scrollSize > offsetSize) {
                var width = $navItems.width();
                $navWidth = ((width + $margin) * $total);
                $nav.css('width', $navWidth);
            }
            this.selectedNav($current);
            this.onViewAnimation('', $current);
            this.onNav();
            this.onControl();
	    };
	    carousel.onNav = function() {
            var self = this;
            $navButtons.on('click', function() {
                if(self.isAnimated()) {
                    return false;
                }
                var index = $navButtons.index($(this));
                if($current === index) {
                    return false;
                }
                self.selectedNav(index);
                self.unselectedNav($current);
                $current = index;
                self.onViewAnimation('', index);
                carousel.onNavAnimation(index);
            });
	    };
	    carousel.onControl = function() {
            var self = this;
            $buttons.on('click', function() {
                if(self.isAnimated()) {
                    return false;
                }
                var isBackBtn = $(this).hasClass('button-prev');
                if(isBackBtn) {
                    self.onPrevCarousel();
                } else {
                    self.onNextCarousel();
                }
                carousel.onNavAnimation();
            });
        }
        carousel.isAnimated = function() {
            return $viewContainer.is(':animated');
        }
	    carousel.getAnimationWidth = function() {
            if($current < 0) {
                return $endMargin;
            } else if(($direction === '-' && $current === 1) || ($direction === '+' && $current == 0) || ($direction === '-' && $current === $total - 1) || ($direction === '+' && $current == $total - 2)) {
                return 136;
            } else if ($direction === '+' && $current === $total - 1) {
                return $endMargin;
            } else if ($direction === '-' && $current === 0) {
                return 0;
            } else {
                return 360;
            }
        }
        carousel.getDirectAnimationWidth = function(index) {
            if(index === 0) {
                return 0;
            } else if(index < 2) {
                return opts.padding;
            } else if(index > 1 && index < $total - 1) {
                return (opts.width * (index - 1)) + opts.padding;
            } else if(index > 1 && index === $total - 1) {
                return (opts.width * (index - 2)) + (opts.padding * 2);
            }
        }
        carousel.getMargin = function() {
            return parseInt($viewContainer.css('margin-left'), 10);
	    }
	    carousel.isAtEnd = function() {
            return parseInt($viewContainer.css('margin-left'), 10) === $endMargin;
	    }
	    carousel.isAtStart = function() {
            return parseInt($viewContainer.css('margin-left'), 10) === 0;
        }
        carousel.getBreakPointIndex = function(index) {
            return $.inArray(index, $breakPoint);
        }
	    carousel.selectedNav = function(index) {
            $navButtons.filter(':eq(' + index + ')').addClass('active');
	    };
	    carousel.unselectedNav = function(index) {
            $navButtons.filter(':eq(' + index + ')').removeClass('active');
	    };
	    carousel.onViewAnimation = function(direction, index) {
            var $originalValue = this.getAnimationWidth();
            var $value = direction ? direction + '=' + $originalValue : -(this.getDirectAnimationWidth(index));
            var $text = ($originalValue === 0) ? 0 : $value + 'px';
            $viewContainer.stop().animate({
                "margin-left" : $text
            }, opts.duration);
        }
        carousel.onNavAnimation = function(index) {
            index = index || $current;
            var $margin = 0;
            if($current === 0) {
                $breakPointIndex = 0;
                $margin = $navSlideWidth * $breakPointIndex;
            } else if($current === $total - 1) {
                $margin = ($navSlideWidth * ($breakPointIndex - 1) + (($navWidth - $viewContainerWidth) - ($navSlideWidth * ($breakPointIndex - 1)))) - $navItemsMargin;
            } else {
                $breakPointIndex = $navButtons.filter(':eq(' + index + ')').attr('data-breakpoint');
                if($breakPointIndex == $breakPoint.length) {
                    $margin = ($navSlideWidth * ($breakPointIndex - 1) + (($navWidth - $viewContainerWidth) - ($navSlideWidth * ($breakPointIndex - 1)))) - $navItemsMargin;
                } else {
                    $margin = $navSlideWidth * $breakPointIndex;
                }
            }
            $nav.stop().animate({
                "margin-left" : '-' + $margin + 'px'
            }, opts.duration);
            
        }
	    carousel.onNextCarousel = function() {
            $direction = '-';
            this.unselectedNav($current);
            $current = this.isAtEnd() ? 0 : $current + 1;
            this.selectedNav($current);
            this.onViewAnimation($direction, $current);
	    }
	    carousel.onPrevCarousel = function() {
            $direction = '+';
            this.unselectedNav($current);
            $current = this.isAtStart() ? $total - 1 : $current - 1;
            this.selectedNav($current);
            this.onViewAnimation($direction, $current);
	    }
	    carousel.init();
	}
	$.fn.Carousel = function(options) {
	    return this.each(function() {
		  if (undefined == $(this).data('Carousel')) {
			var plugin = new $.Carousel(this, options);
			$(this).data('Carousel', plugin);
		  }
	    });
	}
})(jQuery);
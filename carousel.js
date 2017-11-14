<<<<<<< HEAD
;(function($) {
    
	$.Carousel = function(element, options) {

	    if(!element) {
		  return false;
	    }
	    var carousel = this;
		
=======
;(function($) {    
	$.Carousel = function(element, options) {
	    if(!element) {
		  return false;
	    }
        var carousel = this;
        options = options || {};
>>>>>>> origin/develop
	    var opts = {
            width : 360,
            padding : 136,
            duration : 500,
            index : (options.index - 1) || 0
        }
<<<<<<< HEAD

=======
>>>>>>> origin/develop
	    var $this = $(element),
            $view = $this.find('.carousel-view'),
            $viewContainer = $view.find('.carousel-view-container'),
            $viewItems = $view.find('.item'),
            $nav = $this.find('.carousel-nav'),
            $navItems = $nav.find('li'),
            $navButtons = $nav.find('button'),
            $buttons = $this.find('> .button'),
            $total = $viewItems.length,
            $endMargin = -((($total - 3) * opts.width) + (opts.padding * 2)),
            $direction = '',
            $current = opts.index,
            $breakPoint = [],
            $containerWidth = $this.width(),
            $navWidth = 0;
<<<<<<< HEAD

	    carousel.init = function() {

=======
	    carousel.init = function() {
>>>>>>> origin/develop
            var $containerWidth = $this.width();
            var $navItemWidth = $navItems.filter(':eq(0)').width();
            var $margin = parseInt($navItems.filter(':eq(0)').css('margin-right').replace("px", ""));
            var sum = 0;
<<<<<<< HEAD

=======
>>>>>>> origin/develop
            $viewContainer.css('width', (opts.width * $total));
            $viewItems.each(function(i) {
                $(this).css('width', opts.width);
                sum += $navItemWidth + $margin;
                if(sum > $containerWidth) {
                    $breakPoint.push(i);
                }
            })
<<<<<<< HEAD

            $navWidth = ($navItemWidth + $margin) * ($breakPoint[0] - 1);

            var scrollSize = 0;
            var offsetSize = 0;

            $nav.addClass('nowrap');

            scrollSize = $nav[0].scrollHeight;
            offsetSize = $nav[0].offsetHeight;

            $nav.removeClass('nowrap');

=======
            $navWidth = ($navItemWidth + $margin) * ($breakPoint[0] - 1);
            var scrollSize = 0;
            var offsetSize = 0;
            $nav.addClass('nowrap');
            scrollSize = $nav[0].scrollHeight;
            offsetSize = $nav[0].offsetHeight;
            $nav.removeClass('nowrap');
>>>>>>> origin/develop
            if(scrollSize > offsetSize) {
                var width = $navItems.width();
                $nav.css('width', ((width + $margin) * $total));
                
            }
            this.selectedNav($current);
            this.onViewAnimation('', $current);
            this.onNav();
<<<<<<< HEAD

            this.onControl();

	    };
	    carousel.onNav = function() {

            var self = this;

            $navButtons.on('click', function() {

=======
            this.onControl();
	    };
	    carousel.onNav = function() {
            var self = this;
            $navButtons.on('click', function() {
                if(self.isAnimated()) {
                    return false;
                }
>>>>>>> origin/develop
                var index = $navButtons.index($(this));
                if($current === index) {
                    return false;
                }
                self.selectedNav(index);
                self.unselectedNav($current);
                self.onViewAnimation('', index);
                $current = index;
                carousel.onNavAnimation()
<<<<<<< HEAD

            });

	    };
	    carousel.onControl = function() {

            var self = this;

            $buttons.on('click', function() {
                if($viewContainer.is(':animated')) {
                    return false;
                }

=======
            });
	    };
	    carousel.onControl = function() {
            var self = this;
            $buttons.on('click', function() {
                if(self.isAnimated()) {
                    return false;
                }
>>>>>>> origin/develop
                var isBackBtn = $(this).hasClass('button-prev');
                if(isBackBtn) {
                    self.onPrevCarousel();
                } else {
                    self.onNextCarousel();
                }
<<<<<<< HEAD

                carousel.onNavAnimation();

            });

	    }
=======
                carousel.onNavAnimation();
            });
        }
        carousel.isAnimated = function() {
            return $viewContainer.is(':animated');
        }
>>>>>>> origin/develop
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
<<<<<<< HEAD
            console.log(index);
            if(index === 0) {
                return 0;
            } else if(index < 2) {
                return (opts.padding);
            } else if(index > 1 && index < $total - 1) {
                return ((opts.width * (index - 1)) + opts.padding);
            } else if(index > 1 && index === $total - 1) {
                return ((opts.width * (index - 2)) + (opts.padding * 2));
=======
            if(index === 0) {
                return 0;
            } else if(index < 2) {
                return opts.padding;
            } else if(index > 1 && index < $total - 1) {
                return (opts.width * (index - 1)) + opts.padding;
            } else if(index > 1 && index === $total - 1) {
                return (opts.width * (index - 2)) + (opts.padding * 2);
>>>>>>> origin/develop
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
	    carousel.selectedNav = function(index) {
            $navButtons.filter(':eq(' + index + ')').addClass('active');
	    };
	    carousel.unselectedNav = function(index) {
            $navButtons.filter(':eq(' + index + ')').removeClass('active');
	    };
	    carousel.onViewAnimation = function(direction, index) {
<<<<<<< HEAD
            if($viewContainer.is(':animated')) {
                return false;
            }
=======
>>>>>>> origin/develop
            var $originalValue = this.getAnimationWidth();
            var $value = direction ? direction + '=' + $originalValue : -(this.getDirectAnimationWidth(index));
            var $text = ($originalValue === 0) ? 0 : $value + 'px';
            $viewContainer.stop().animate({
                "margin-left" : $text
            }, opts.duration);
        }
        carousel.onNavAnimation = function() {
            var index = Math.floor($current / $breakPoint[0]);
            $nav.stop().animate({
                "margin-left" : '-' + ($navWidth * index) + 'px'
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
<<<<<<< HEAD

=======
>>>>>>> origin/develop
	$.fn.Carousel = function(options) {
	    return this.each(function() {
		  if (undefined == $(this).data('Carousel')) {
			var plugin = new $.Carousel(this, options);
			$(this).data('Carousel', plugin);
		  }
	    });
	}
<<<<<<< HEAD

=======
>>>>>>> origin/develop
})(jQuery);
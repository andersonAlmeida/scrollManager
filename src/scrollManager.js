(function(factory) {
	factory(window, document, jQuery);
}(function(win, doc, $) {
	'use strict';

	var ScrollManager = function(element, options) {
		this.element = element;
		this.elmHeight = element.height();
		this.elmWidth = element.width(); 
		this.context = options.context;
		this.onEnter = options.onEnter;
		this.onExit = options.onExit;
		this.inView = false;
		this.offset = options.offset;
		
		// bind events		
		this.binds();
		this.isInView();
	};

	ScrollManager.prototype.binds = function() {
		var self = this;

		$(this.context).on('scroll', function() {

			self.isInView();

		});
	};

	ScrollManager.prototype.isInView = function() {
		var sec = this.element,
			context = $(this.context),
			elmHeight = this.elmHeight,
			winOffset = context.scrollTop() + win.innerHeight,
			offset = sec.height() * this.offset;

		if( !this.inView && ( ( ( sec.offset().top + offset ) >= context.scrollTop() &&  ( sec.offset().top + offset ) < winOffset ) || ( sec.offset().top + sec.height() - offset > context.scrollTop() && sec.offset().top + sec.height() - offset < winOffset ) ) ) {
			this.inView = true;

			if(this.onEnter) {
				this.onEnter.call(this, sec);
			}

			return true;
		}

		if( this.inView && ( sec.offset().top + sec.height() < context.scrollTop() || sec.offset().top > winOffset ) ) {
			this.inView = false;

			if(this.onExit) {
				this.onExit.call(this, sec);
			}

			return false;
		}

		// this.inView = false;
		return false;
	};

	$.fn.scrollmanager = function(options) {
		var defaults = {
			offset: 0,
			context: win
		},
		settings = $.extend({
			onEnter: null,
			onExit: null,
			onceEnter: null,
			onceExit: null
		}, defaults, options);

		return this.each (function () {
            var elm = $(this);           
            new ScrollManager(elm, settings);
        });		
	}
}));
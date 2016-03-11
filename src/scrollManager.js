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
		this.onceEnter = options.onceEnter;
		this.onceExit = options.onceExit;
		this.inView = false;
		this.offset = options.offset;
		this.scrollDirection = $(this.context).scrollTop();
		
		// bind events		
		this.binds();
		this.isInView();
	};

	ScrollManager.prototype.binds = function() {
		var self = this,
			dir = 0;

		$(this.context).on('scroll', function() {
			// stores the scroll directoin
			dir = ( self.scrollDirection > $(this).scrollTop() ) ? -1 : 1;

			self.isInView(dir);

			self.scrollDirection = $(this).scrollTop();
		});
	};

	ScrollManager.prototype.isInView = function(direction) {
		var sec = this.element,
			context = $(this.context),
			elmHeight = this.elmHeight,
			winOffset = context.scrollTop() + win.innerHeight,
			offset = sec.height() * this.offset;	

		if( !this.inView && ( ( ( sec.offset().top + offset ) >= context.scrollTop() && ( sec.offset().top + offset ) < winOffset ) || ( sec.offset().top + sec.height() - offset > context.scrollTop() && sec.offset().top + sec.height() - offset < winOffset ) ) ) {
			this.inView = true;

			if(this.onceEnter && typeof this.onceEnter === "function") {
				this.onceEnter.call(this, sec);
				this.onceEnter = null;
			}

			if(this.onEnter && typeof this.onEnter === "function") {
				this.onEnter.call(this, sec);
			}

			return true;
		}

		if( this.inView && ( sec.offset().top + sec.height() < context.scrollTop() || sec.offset().top > winOffset ) ) {
			this.inView = false;

			if(this.onceExit && typeof this.onceExit === "function") {
				this.onceExit.call(this, sec);
				this.onceExit = null;
			}

			if(this.onExit && typeof this.onExit === "function") {
				this.onExit.call(this, sec);
			}

			return false;
		}

		// this.inView = false;
		return false;
	};

	//destroy
	ScrollManager.prototype.destroy = function() {
		$(this.context).off('scroll');
		delete this;
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
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
		this.isInView(1);
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
		var w = $(win),
			sec = this.element,
			context = $(this.context),
			// secHeight = sec.height() * this.offset,
			// secTop = sec.offset().top,
			// secBottom = secTop + secHeight,
			// scrollTop = context.scrollTop(), 
			// winOffset = context.scrollTop() + w.innerHeight,
			offset = sec.height() * this.offset;

			var viewport = {
		        top : context.scrollTop(),
		        left : context.scrollLeft()
		    };
		    viewport.right = viewport.left + w.width();
		    viewport.bottom = viewport.top + w.height();
		    
		    var bounds = this.element.offset();
		    bounds.right = bounds.left + this.element.outerWidth();
		    bounds.bottom = bounds.top + this.element.outerHeight();

		    //(!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom))
		
		// debugger;

		// if( !this.inView && ( (bounds.top + offset < viewport.bottom && bounds.top - offset >= viewport.top) || (bounds.bottom <= viewport.bottom && bounds.bottom - offset > viewport.top) ) ) {

		if(direction > 0) {
			if( !this.inView && ( (bounds.top + offset < viewport.bottom && bounds.top >= viewport.top) || (bounds.bottom <= viewport.bottom && bounds.bottom - offset > viewport.top) ) ) {				
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
		} else {
			if( !this.inView && ( (bounds.top < viewport.bottom && bounds.top - offset >= viewport.top) || (bounds.bottom <= viewport.bottom && bounds.bottom - offset > viewport.top) ) ) {				
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
		}	
			

		// verify if leaves the viewport
		if( this.inView && ( bounds.bottom <= viewport.top || bounds.top >= viewport.bottom ) ) {
		// if( this.inView && ( secTop + secHeight <= scrollTop || secTop >= winOffset ) ) {
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
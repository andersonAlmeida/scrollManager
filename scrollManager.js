(function(factory) {
	factory(window, document, jQuery);
}(function(win, doc, $) {

	var ScrollManager = function(element, options) {
		this.elmHeight = element.height();
		this.elmWidth = element.width(); 
		this.context = options.context;
		this.onEnter = options.onEnter;
		this.onExit = options.onExit;
		
		// bind events		
		this.binds();
	};

	ScrollManager.prototype.binds = function() {
		var self = this;

		$(this.context).on('scroll', function() {
			console.log("scrollando as parada tudo !!!!");
			
			if( self.isInView() ) {

				if(self.onEnter) {
					self.onEnter.call(this);
				}

			}
		});
	};

	ScrollManager.prototype.isInView = function() {
		
		return false;
	};

	$.fn.scrollmanager = function(options) {
		var defaults = {
			offset: '0',
			context: win
		},
		settings = $.extend({
			onEnter: null,
			onExit: null
		}, defaults, options);

		return this.each (function () {
            var elm = $(this);           
            new ScrollManager(elm, settings);
        });		
	}
}));
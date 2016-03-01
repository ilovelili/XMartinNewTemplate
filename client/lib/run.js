$('.bs-component [data-toggle="popover"]').popover();
$('.bs-component [data-toggle="tooltip"]').tooltip();

// hack, delete me later
var seed,
    hackStyle = function() {
    	// begin hack
    	if($('.title.ng-binding').length) {
    		$('.title.ng-binding').parent().css('height', '200px');
    		$('.title.ng-binding').css('font-size', '20px');

    		window.clearInterval(seed);
    	}
    };

seed = window.setInterval(hackStyle, 300);

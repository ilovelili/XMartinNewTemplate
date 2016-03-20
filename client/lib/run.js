$('.bs-component [data-toggle="popover"]').popover();
$('.bs-component [data-toggle="tooltip"]').tooltip();

// hack, delete me later
/*var seed,
    hackStyle = function() {
    	// begin hack
    	if($('.title.ng-binding').length) {
    		$('.title.ng-binding').parent().css('height', '200px');
    		$('.title.ng-binding').css('font-size', '20px');

    		window.clearInterval(seed);
    	}
    };

seed = window.setInterval(hackStyle, 300);*/

window.onload = function () {
    // ランキングswitch
    $(".ranking_switch_tab_week").click(function () {
        $(":root").find(".ranking_switch_week").show();
        $(":root").find(".ranking_switch_month").hide();
        $(":root").find(".ranking_switch_fulltime").hide();
    });
    $(".ranking_switch_tab_month").click(function () {
        $(":root").find(".ranking_switch_week").hide();
        $(":root").find(".ranking_switch_month").show();
        $(":root").find(".ranking_switch_fulltime").hide();
    });
    $(".ranking_switch_tab_fulltime").click(function () {
        $(":root").find(".ranking_switch_week").hide();
        $(":root").find(".ranking_switch_month").hide();
        $(":root").find(".ranking_switch_fulltime").show();
    });

    $(".video_wrapper .video iframe").addClass('player');
};

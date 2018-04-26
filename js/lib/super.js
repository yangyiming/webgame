define(['jquery'],function($){
	
	create();
    $(window).on('resize', function() {
        create();
    })
    function create(){
    	window.stage = [1440, 768];
	    var w = $(window).width();
	    var h = w / (stage[0] / stage[1]);
	    var windowH = $(window).height();
	    var minH = Math.min(windowH,h);
	    var minW = (stage[0] / stage[1]) * minH;
	    window.realStage = [minW, minH];
	    $('#main').css({
	    	width:minW,
	    	height:minH,
	    	position:'absolute',
	    	left:'50%',
	    	marginLeft:-minW/2+'px'
	    })
    }
	function loadding(){
		setTimeout(function(){
			window.start = true;
		},0)
	}
	return loadding;
	
})
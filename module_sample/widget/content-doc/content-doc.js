var option = {
    init: function () {
    	var baseTop = $("#category").offset().top;
      	$(document).bind("scroll",function(){
		    if($(document).scrollTop() > baseTop){
		    	$("#category").addClass("doc-fixed-top");
		    }
		    if($(document).scrollTop() < baseTop){
		    	$("#category").removeClass("doc-fixed-top");
		    }
		});
    },

    events: {
    	//do not work
    	// 'document scroll':function(){
    	// 	console.log(123);
    	// }
    }
};

module.exports = Rosetta.Component(option);
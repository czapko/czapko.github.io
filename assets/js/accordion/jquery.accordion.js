/**
* Hordion = Horizontal Accordion for jQuery
* 
* hordion r1 // 22.10.2008
* tested with jQuery 1.2.6+ and in IE6, IE7, FF2, FF3, Safari 3, Opera 9.5
* <http://deltatech-v2.de>
* <http://graubalance.com>
* 
* Uses jQuery hoverIntent plug-in IF available.
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* Dieses Plugin darf verwendet werden, wie du willst. Wenn du es irgendwo einsetzt, wäre es schön für mich zu wissen, wo.
* Schicke in diesem Fall doch einfach eine kurze Email an den Author: hordion@deltatech-v2.de, mit der URL wo dieses Plugin
* eingesetzt wird.
* 
* // basic usage // assumes ul/li html structure
* jQuery("#container").hordion(); // Getestet mit UL#container -> LIs und DIV#container -> DIVs
* 
* // advanced usage receives configuration object only
* jQuery("#container").hordion({
*						speed: 500,				// msec = Duration of the Animations. Default = 500
*						max: 250,				// Pixel = width of the opened Element. Default = 250
*						easing: "easeOutBounce" // requires Easing-Plugin. Default is "linear"
* });
* 
* @param  options  An object with configuration options
* @author    Robert Heine, Graubalance GmbH <hordion@deltatech-v2.de>
*/
jQuery.fn.extend({
  hordion: function(params){
    var params = jQuery.extend({
      speed: 500,
      max: 250,
      min: 75, // wird überschrieben
      easing: "linear",
      activeClass: "" // Ein Kind-Element mit dieser Klasse ist offen, wenn die Maus den Container verlässt
    },params);
    
    var containerElement = "";
    var childNodeName = "";
    var numElements = 0;
    var gesamtBreite = "";
    var incr = "";

    var hoverIntConfig = {    
			sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)    
			interval: 20, // number = milliseconds for onMouseOver polling interval    
			over: hoverIn, // function = onMouseOver callback (REQUIRED)    
			timeout: 30, // number = milliseconds delay before onMouseOut    
			out: hoverOut // function = onMouseOut callback (REQUIRED)    
		};
		
	function init(containerElement) {
	
	    // var containerElement = this;
	    childNodeName = jQuery(containerElement).children().get(0).nodeName; // Tagname der Kindelemente, die animiert werden - Autodetect
	    numElements = jQuery(childNodeName, containerElement).length; // Anzahl der Elemente
	    gesamtBreite = jQuery(containerElement).width(); // Breite des Containers
	    incr = gesamtBreite / numElements; // gleichmäßige Verteilung zu Beginn und bei Mouseout
	    params.min = (gesamtBreite - params.max) / (numElements-1); // Berechnet das Minimun automatisch anhand des gegebenen Maximums
	    
	    var i=0;
	    jQuery(containerElement).css("position", "relative").css("overflow", "hidden").css("list-style", "none"); // Container rendern
	    jQuery(childNodeName, containerElement).each(function(){ // Elemente im Container anordnen und rendern
	    	jQuery(this).data("leftPosition", (i*params.min));
	    	jQuery(this).data("rightPosition", ((i*params.min)+params.max-params.min));
	    	jQuery(this).css("left", (incr*i)+"px");
	    	jQuery(this).css("overflow", "hidden").css("width", "100%").css("position", "absolute").css("top", "0px").css("height", "100%");
	    	jQuery(this).data("count", (i++));
	    	// $(this).html("Left: "+jQuery(this).data("leftPosition")+"<br>Right: "+jQuery(this).data("rightPosition")); // Debugging
	    });
	}
	
	
    
	function reset() { // Wenn activeClass definiert ist, beim Start und Mouseout das aktive Element vergrößert lassen
		var activeElem = jQuery('.'+params.activeClass, containerElement)
		// Dieses Element und alle die davor kommen, bis auf das erste nach links schieben
		jQuery(activeElem).prevAll(childNodeName).andSelf().each(function(){
			jQuery(this).animate({
				left: jQuery(this).data("leftPosition")+"px"
			}, {queue: false, duration: params.speed, easing: params.easing} );
		});
		// Alle Elemente rechts vom aktuellen verschieben
		jQuery(activeElem).nextAll(childNodeName).each(function(){
			jQuery(this).animate({
				left: jQuery(this).data("rightPosition")+"px"
			}, {queue: false, duration: params.speed, easing: params.easing} );
			
		});
	}
	
	function hoverIn(){
		// Dieses Element und alle die davor kommen, bis auf das erste nach links schieben
		jQuery(this).prevAll(childNodeName).andSelf().each(function(){
			jQuery(this).animate({
				left: jQuery(this).data("leftPosition")+"px"
			}, {queue: false, duration: params.speed, easing: params.easing} );
		});
		// Alle Elemente rechts vom aktuellen verschieben
		jQuery(this).nextAll(childNodeName).each(function(){
			jQuery(this).animate({
				left: jQuery(this).data("rightPosition")+"px"
			}, {queue: false, duration: params.speed, easing: params.easing} );
			
		});
	}
	
	
	function hoverOut(){
		var i = 0;
		// Alle Elemente mittig setzen
		if (params.activeClass!="") reset();		
		else {
			jQuery(childNodeName, containerElement).each(function(){
				// jQuery(this).css("left", (incr*i)+"px");
				jQuery(this).animate({
					left: (incr*i)+"px"
				}, {queue: false, duration: params.speed, easing: params.easing} );
				i++;
			});
		}
	}
	
    return this.each(function() {
	containerElement = this;
	init(this);
	if (params.activeClass!="") reset();		
		
    	if (jQuery.fn.hoverIntent==undefined) {
    		var errormsg = "HoverIntent-Plugin nicht gefunden!";
    		try {
    			console.log(errormsg);
    		} catch (e) {} 
    			
	    	jQuery(childNodeName, this).each(function(){
	    		jQuery(this).mouseover(hoverIn);
	    		jQuery(this).mouseout(hoverOut);
	   		});
    		   		
    	}
    	
    	else {
	    	jQuery(childNodeName, this).each(function(){
	    		jQuery(this).hoverIntent(hoverIntConfig);    	
	   		});
    	}
    });
  }
});
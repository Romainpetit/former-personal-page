function Banner(){
	
	var canvas, context,
		bgCanvas, bgContext,
		density 	= 80,
		particles 	= [],
		colours 	= ['#194250', '#296D83', '#13333D', '#235E70', '#19424F', '#286D82', '#1C4B59', '#2C788F', '#225C6E', '#3289A3'],
		img,
		mouse 		= { x:0, y:0 },
		isDrawing	= false,
		canvasW, canvasH;
	
	this.initialize 	= function( canvas_id, font ) {
		
		if( font )
			defaultFont = font;
		
		reload( canvas_id );
		
var width = $(window).width(); 

		
		window.onresize = function(event) {
			    // do nothing if the width is the same
    if ($(window).width()==width) return; 
    // update new width value
    width = $(window).width();
    // ... your code
			reload( canvas_id );
		}

	};
	
	var reload			= function(canvas_id) {
		
		canvas 			= document.getElementById( canvas_id );			
		context 		= canvas.getContext('2d');
		
		canvasW			= window.innerWidth+110;
		canvasH			= window.innerHeight+100;
		
		canvas.width 	= canvasW;
		canvas.height 	= canvasH;
		
		bgCanvas 		= document.createElement('canvas');
		bgContext 		= bgCanvas.getContext('2d');
		
		bgCanvas.width 	= canvasW;
		bgCanvas.height = canvasH;
		
		canvas.addEventListener( 'mousemove', MouseMove, false );
		canvas.addEventListener( 'mouseout', MouseOut, false );
	    
		prepare();
		setupParticles();
		draw();
		
	};
	
	var prepare 		= function() {

	};
	
	var setupParticles 	= function() {
		
		particles = [];

		
		//Declare our local variables
		var imageData, image_Data, 
			pixel, width	= 0,
			i		= 0,
			slide 	= false;
			n = 1;
			
		//Get the image data - from (0,0) to the edges of the canvas
		imageData = bgContext.getImageData( 0, 0, canvasW, canvasH );
		image_Data= imageData.data;

			
			//Iterate vertically over image data 
			for( var height = 0; height < canvasH; height += density-10 ) {
			
			i++;
	    	slide 	= ((i % 2) == 0);
			width	= 0;
			
			if (slide == true) {
			
	        	width += 40;
			}
			
			//Iterate horizontally over the image data
		    for( width; width < canvasW; width += (density) ) {
			   
				//Get the pixel located at our current iteration
				// pixel = image_Data[ ( ( width + ( height * canvasW ) ) * 4 ) - 1 ];
				  
				//Pixel has been drawn on.

					//Add the coodinates and colour to our particle array.
					particles.push({
						// colour	: colours[ Math.floor( Math.random() * colours.length ) ],
						colour	: colours[ ( width % 3 ) ],

						x		: width,
						y		: height,
						z		: 1,
						id      : i,
					});
				
			}
		}	
	};

		// 	function isNumber(n)
		// {
		//    return n == parseFloat(n);
		// }

		// 	function isEven(n) 
		// {
		//    return isNumber(n) && (n % 2 == 0);
		// }

		// function isOdd(n)
		// {
		//    return isNumber(n) && (n % 2 == 1);
		// }

		// 	function isEven3(n) 
		// {
		//    return isNumber(n) && (n % 3 == 0);
		// }

		// function isOdd3(n)
		// {
		//    return isNumber(n) && (n % 3 == 1);
		// }
	

	var draw 			= function() {
							
		context.clearRect( 0, 0, canvas.width, canvas.height );
        
		var dx, dy, sqrDist, 
			scale = 1.3;


		// particles.sort(function(a,b){return a.z-b.z});
 		
 		for( var i = 0, len = particles.length; i < len; ++i ) {

 			n++;

			var p	= particles[i];
			
			dx 		= p.x - mouse.x;
			dy 		= p.y - mouse.y;
			
			// distance from mouse to particle
			
			sqrDist =  Math.sqrt( dx * dx + dy * dy );
			
				// ( isDrawing ) ? scale = Math.max( Math.min( 12 - ( sqrDist / 10 ), 10 ), 1.3 ) : scale = 1.3;
			
			( isDrawing ) ? scale = Math.max( Math.min( 12 - ( sqrDist / 10 ), 9.5 ), 1 ) : scale = 1;

				// colours 	= ['#79A637', '#547326', '#B1F250', '#9AB572', '#CEF299'],



				// var width  	= density /  1,
				// 	height 	= density / 0.85,

			var width  	= density / 1 - (scale*0.5),
			height 	= density / 0.85 - (scale*0.5);
				// dyncolour = p.colour.substring(1),
				// paint = dyncolour / scale,
				// paint = Math.floor(paint)
				// paint = "#" + paint,

			x 		= p.x,
			y 		= p.y;
				// console.log(paint);
			context.beginPath();

			context.fillStyle = p.colour;



				// 			var grd=context.createRadialGradient(p.x,p.y,33,p.x,p.y,39);
				// grd.addColorStop(0,"rgba(0, 0, 0, 0.8)");
				// grd.addColorStop(1,"rgba(0, 0, 0, 0)");
				// context.strokeStyle=grd;

			context.strokeStyle="rgba(0,0,0,0.1)";
			context.lineWidth=Math.floor(1/(scale/10));
				// 			for( var i = 0; i < p.length; i+=5 ) {
				// 			context.fillStyle = "#fffff";
				// }

				// sélection ligne
				// if (isOdd(p.id) == true) {

				// 	if (isOdd3(n) == true) {

				// 			context.fillStyle = "#ffffff";
				// 			var width  	= density / 1 + scale,
				// 				height 	= density / 0.85 + scale;
				// 				// console.log(p);
				// 	} else{

				// 	};

				// }

				// // sélection ligne
				// else{
				// 	if (isOdd3(n-2) == true) {

				// 			context.fillStyle = "#ffffff";
				// 			var width  	= density / 1 + (scale*15),
				// 				height 	= density / 0.85 + (scale*15);
				// 	} else{

				// 	};
				// };

			z		= Math.floor(2+scale);

			context.moveTo( x, y - height / 2, z);
			context.lineTo( x + width / 2, y - height / 4 ), z;
			context.lineTo( x + width / 2, y + height / 4 ), z;
			context.lineTo( x, y + height / 2 ), z;
			context.lineTo( x - width / 2, y + height / 4 ), z;
			context.lineTo( x - width / 2, y - height / 4 ), z;
			context.lineTo( x, y - height / 2 ), z;



				// var blur = 5;
				// context.shadowBlur = blur;
				// context.shadowColor="rgba(0,0,0,0.8)";

			context.fill();

			p.z		= z;

     		context.stroke();
		}

		for( var i = 0, len = particles.length; i < len; ++i ) {n=-1}

			
			context.closePath();

	};
	
	var MouseMove 		= function( e ) {

		mouse.x = e.offsetX || ( e.layerX - canvas.offsetLeft );
   		mouse.y = e.offsetY || ( e.layerY - canvas.offsetTop );


		
		if( !isDrawing ) {

			isDrawing = true;
			drawTimeout = setTimeout( function() {

				draw();
				isDrawing = false;
			}, 5);
		}
	};
	
	var MouseOut 		= function(e) {
		
		isDrawing = false;	
		clearTimeout( drawTimeout );

		draw();
	};
}
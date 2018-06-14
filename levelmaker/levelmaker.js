window.onload = levelmaker;
function levelmaker(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	
	var canvasX = 0;		// X point in game
	var canvasY = 0;		// Y point in game

	var levelHTML = document.getElementById("textbox1");

	// -------------------------------------- Background -------------------------------------- //
	var SpaceImage = new Image();
		SpaceImage.src = "Assets/space.png";

	function RefreshFrame(context){
		// clear canvas
		context.clearRect( 0 , 0 , canvasWidth , canvasHeight );	// clear frame
		
		// draw background
		context.drawImage( SpaceImage , 0 , 0 , canvasWidth , canvasHeight );		// space		
	}

	// -------------------------------------- Bricks -------------------------------------- //
	var BrickQuantity = 255;
	var BrickWidth = 80;
	var BrickHeight = 30;

	function Bricks(X, Y, life, color){
		this.X = X;
		this.Y = Y;
		this.life = life;
		this.color = color;
	}

	var Brick = new Array();
	for (var i=0 ; i < BrickQuantity ; i++){
		Brick.push(new Bricks(0,0,0,11));
	}
	
	for (var j = 0 ; j < BrickQuantity ; j += 15){
		for (var i = 0 ; i < 15 ; i++){
			Brick[i + j].X = i * BrickWidth;
			Brick[i + j].Y = (j / 15) * BrickHeight;
		}
	}
	
	
	// --------------- Red --------------- //
	var RedBrickImage = new Image();
		RedBrickImage.src = "Assets/RedBrick.png";
	
	// --------------- Yellow --------------- //
	var YellowBrickImage = new Image();
		YellowBrickImage.src = "Assets/YellowBrick.png";
	
	// --------------- Blue --------------- //
	var BlueBrickImage = new Image();
		BlueBrickImage.src = "Assets/BlueBrick.png";
		
	// --------------- Green --------------- //
	var GreenBrickImage = new Image();
		GreenBrickImage.src = "Assets/GreenBrick.png";
	
	// --------------- Orange --------------- //
	var OrangeBrickImage = new Image();
		OrangeBrickImage.src = "Assets/OrangeBrick.png";
	
	// --------------- Purple --------------- //
	var PurpleBrickImage = new Image();
		PurpleBrickImage.src = "Assets/PurpleBrick.png";
	
	// --------------- Pink --------------- //
	var PinkBrickImage = new Image();
		PinkBrickImage.src = "Assets/PinkBrick.png";

	// --------------- Dark Pink --------------- //
	var DarkPinkBrickImage = new Image();
		DarkPinkBrickImage.src = "Assets/DarkPinkBrick.png";

	// --------------- Turquoise --------------- //
	var TurquoiseBrickImage = new Image();
		TurquoiseBrickImage.src = "Assets/TurquoiseBrick.png";
		
	// --------------- White --------------- //
	var WhiteBrickImage = new Image();
		WhiteBrickImage.src = "Assets/WhiteBrick.png";
	var WhiteBrickBrokenImage = new Image();
		WhiteBrickBrokenImage.src = "Assets/WhiteBrickBroken.png";
		
	// --------------- Gray --------------- //
	var GrayBrickImage = new Image();
		GrayBrickImage.src = "Assets/GrayBrick.png";

	// --------------- Empty --------------- //
	var EmptyBrickImage = new Image();
		EmptyBrickImage.src = "Assets/EmptyBrick.png";

	// --------------- Selected --------------- //
	var SelectedImage = new Image();
		SelectedImage.src = "Assets/select.png";
		
	// --------------- Ready --------------- //
	var ReadyImage = new Image();
		ReadyImage.src = "Assets/ButtonOKU.png";

	// --------------- Load --------------- //
	var LoadImage = new Image();
		LoadImage.src = "Assets/ButtonLoad.png";

	// --------------- Clear --------------- //
	var ClearImage = new Image();
		ClearImage.src = "Assets/ButtonClear.png";

	// --------------- Fill --------------- //
	var FillImage = new Image();
		FillImage.src = "Assets/ButtonFill.png";
		
		
		
	function BrickInit(){
		for (var i=0 ; i < BrickQuantity ; i++)
			Brick[i].color = 11;
	}

	function BrickFill(color){
		for (var i=0 ; i < BrickQuantity ; i++)
			Brick[i].color = color;
	}
	

	function PaintBrick(i, color){
		if (color == "Red"){
			Brick[i].color = 0;
		}
		else if (color == "Yellow"){
			Brick[i].color = 1;
		}
		else if (color == "Blue"){
			Brick[i].color = 2;
		}
		else if (color == "Green"){
			Brick[i].color = 3;
		}
		else if (color == "Orange"){
			Brick[i].color = 4;
		}
		else if (color == "Purple"){
			Brick[i].color = 5;
		}
		else if (color == "Pink"){
			Brick[i].color = 6;
		}
		else if (color == "DarkPink"){
			Brick[i].color = 7;
		}
		else if (color == "Turquoise"){
			Brick[i].color = 8;
		}
		else if (color == "White"){
			Brick[i].color = 9;
		}
		else if (color == "Gray"){
			Brick[i].color = 10;
		}
	}

	function BricksShow(context){
		for (var i = 0 ; i < BrickQuantity ; i++){
				if (Brick[i].color == 0)
					context.drawImage( RedBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 1)
					context.drawImage( YellowBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 2)
					context.drawImage( BlueBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 3)
					context.drawImage( GreenBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 4)
					context.drawImage( OrangeBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 5)
					context.drawImage( PurpleBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 6)
					context.drawImage( PinkBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 7)
					context.drawImage( DarkPinkBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 8)
					context.drawImage( TurquoiseBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 9)
					context.drawImage( WhiteBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 10)
					context.drawImage( GrayBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 11)
					context.drawImage( EmptyBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
		}
	}

	function buttonObj(type,X,Y,width,height){
		this.type = type;
		this.X = X;
		this.Y = Y;
		this.width = width;
		this.height = height;
	}
	
	var button = new Array();
	
	button[0] = new buttonObj("Red",0,0,80,30);
	button[1] = new buttonObj("Yellow",0,0,80,30);
	button[2] = new buttonObj("Blue",0,0,80,30);
	button[3] = new buttonObj("Green",0,0,80,30);
	button[4] = new buttonObj("Orange",0,0,80,30);
	button[5] = new buttonObj("Purple",0,0,80,30);
	button[6] = new buttonObj("Pink",0,0,80,30);
	button[7] = new buttonObj("DarkPink",0,0,80,30);
	button[8] = new buttonObj("Turquoise",0,0,80,30);
	button[9] = new buttonObj("White",0,0,80,30);
	button[10] = new buttonObj("Gray",0,0,80,30);

	var selection = 0;
	
	for (var j = 0 ; j < 11 ; j++){
		button[j].X = j * (BrickWidth + 20) + 60;
		button[j].Y = 810;
	}

	var Clear = {
		X : 162,
		Y : 700,
		width : 200,
		height : 50
	};

	var Fill = {
		X : 387,
		Y : 700,
		width : 200,
		height : 50
	};

	var Load = {
		X : 613,
		Y : 700,
		width : 200,
		height : 50
	};

	var Ready = {
		X : 838,
		Y : 700,
		width : 200,
		height : 50
	};

	
	function ButtonPressed (Butn,X,Y){
		if (X >= Butn.X && X <= Butn.X + Butn.width && Y >= Butn.Y && Y <= Butn.Y + Butn.height)
			return true;
		else
			return false;
	}
	
	function ShowButtons(context){
			context.drawImage( RedBrickImage , button[0].X , button[0].Y , button[0].width , button[0].height );
			context.drawImage( YellowBrickImage , button[1].X , button[1].Y , button[1].width , button[1].height );
			context.drawImage( BlueBrickImage , button[2].X , button[2].Y , button[2].width , button[2].height );
			context.drawImage( GreenBrickImage , button[3].X , button[3].Y , button[3].width , button[3].height );
			context.drawImage( OrangeBrickImage , button[4].X , button[4].Y , button[4].width , button[4].height );
			context.drawImage( PurpleBrickImage , button[5].X , button[5].Y , button[5].width , button[5].height );
			context.drawImage( PinkBrickImage , button[6].X , button[6].Y , button[6].width , button[6].height );
			context.drawImage( DarkPinkBrickImage , button[7].X , button[7].Y , button[7].width , button[7].height );
			context.drawImage( TurquoiseBrickImage , button[8].X , button[8].Y , button[8].width , button[8].height );
			context.drawImage( WhiteBrickImage , button[9].X , button[9].Y , button[9].width , button[9].height );
			context.drawImage( GrayBrickImage , button[10].X , button[10].Y , button[10].width , button[10].height );

			context.drawImage( SelectedImage , button[selection].X - 10 , button[selection].Y - 10 , button[selection].width + 20 , button[selection].height + 20 );
			
			context.drawImage( ClearImage , Clear.X , Clear.Y , Clear.width , Clear.height );

			context.drawImage( LoadImage , Load.X , Load.Y , Load.width , Load.height );

			context.drawImage( ReadyImage , Ready.X , Ready.Y , Ready.width , Ready.height );

			context.drawImage( FillImage , Fill.X , Fill.Y , Fill.width , Fill.height );

		}
	
	// -------------------------------------- Show -------------------------------------- //

	function Show(){
	
		RefreshFrame(context);

		BricksShow(context);
			
		ShowButtons(context);
	}
	
	function GetTheCode(){
		
		levelHTML.value = "";
	
		for (var i = 0 ; i <= BrickQuantity ; i++){
			if (Brick[i].color == 0)
				levelHTML.value += "PaintBrick("+i+",\"Red\");";
			else if (Brick[i].color == 1)
				levelHTML.value += "PaintBrick("+i+",\"Yellow\");";
			else if (Brick[i].color == 2)
				levelHTML.value += "PaintBrick("+i+",\"Blue\");";
			else if (Brick[i].color == 3)
				levelHTML.value += "PaintBrick("+i+",\"Green\");";
			else if (Brick[i].color == 4)
				levelHTML.value += "PaintBrick("+i+",\"Orange\");";
			else if (Brick[i].color == 5)
				levelHTML.value += "PaintBrick("+i+",\"Purple\");";
			else if (Brick[i].color == 6)
				levelHTML.value += "PaintBrick("+i+",\"Pink\");";
			else if (Brick[i].color == 7)
				levelHTML.value += "PaintBrick("+i+",\"DarkPink\");";
			else if (Brick[i].color == 8)
				levelHTML.value += "PaintBrick("+i+",\"Turquoise\");";
			else if (Brick[i].color == 9)
				levelHTML.value += "PaintBrick("+i+",\"White\");";
			else if (Brick[i].color == 10)
				levelHTML.value += "PaintBrick("+i+",\"Gray\");";

		}

	}
	
	function LoadTheCode(){
		BrickInit();
		eval(levelHTML.value);
	}
	
	Show();
	// -------------------------------------- Levels -------------------------------------- //

	
	// -------------------------------------- Mouse Listeners -------------------------------------- //

	var leftDrag = false;
	var rightDrag = false;
	
	canvas.addEventListener('mousemove',mouseMove,true);  // mouse input function
	canvas.addEventListener('mousedown',mouseDown,true);  // mouse input function
	canvas.addEventListener('mouseup',mouseUp,true);  // mouse input function

	function mouseMove(e){
		canvasX = e.clientX - canvas.getBoundingClientRect().left;
		canvasY = e.clientY - canvas.getBoundingClientRect().top;

		if (leftDrag == true && canvasY < 510 && canvasX < 1200)
			Brick[Math.floor(canvasY / BrickHeight) * 15 + Math.floor(canvasX / BrickWidth)].color = selection;
		else if (rightDrag == true && canvasY < 510 && canvasX < 1200)
			Brick[Math.floor(canvasY / BrickHeight) * 15 + Math.floor(canvasX / BrickWidth)].color = 11;
		
		canvas.style.cursor = "default";
		
		Show();

	}
	
	function mouseDown (e){
		if (e.which == 1){
			leftDrag = true;
			if (canvasY < 510 && canvasX < 1200)
				Brick[Math.floor(canvasY / BrickHeight) * 15 + Math.floor(canvasX / BrickWidth)].color = selection;
			else{
				for (var j = 0 ; j < 11 ; j++)
					if (ButtonPressed(button[j], canvasX, canvasY) == true)		
						selection = j;
				
				if (ButtonPressed(Ready, canvasX, canvasY) == true)
					GetTheCode();

				if (ButtonPressed(Clear, canvasX, canvasY) == true)
					 BrickInit();

				if (ButtonPressed(Load, canvasX, canvasY) == true)
					 LoadTheCode();
					 
				if (ButtonPressed(Fill, canvasX, canvasY) == true)
					 BrickFill(selection);
					 
			}
		}else if (e.which == 3){
			rightDrag = true;
			if (canvasY < 510 && canvasX < 1200)
				Brick[Math.floor(canvasY / BrickHeight) * 15 + Math.floor(canvasX / BrickWidth)].color = 11;
		
		}
		Show();
	}
	
	function mouseUp (e){
		leftDrag = false;
		rightDrag = false;
	}
}
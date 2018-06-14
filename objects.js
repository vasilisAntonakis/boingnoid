	var canvasWidth = 0;
	var canvasHeight = 0;
	var difficulty = 8;
	var BallImage = new Image();
	
	BallImage.src = "Assets/Ball.png";

	// ------------------------------ Ball ------------------------------ // 
	
	function BallObj(X,Y,speed,angle,hits,Xmove,Ymove,Xgoing,Ygoing,Sticks,StickPos){
		this.X = X;this.Y = Y;this.speed = speed;this.angle = angle;this.hits = hits;this.Xmove = Xmove;
		this.Ymove = Ymove;
		this.Xgoing = Xgoing;
		this.Ygoing = Ygoing;
		this.Sticks = Sticks;
		this.StickPos = StickPos;
	}
	
	var Ball = new Array();
	
	Ball[0] = new BallObj(0,0,0,0,0,0,0,"Right","Down",false,0);
	Ball[1] = new BallObj(0,0,0,0,0,0,0,"Right","Down",false,0);
	Ball[2] = new BallObj(0,0,0,0,0,0,0,"Right","Down",false,0);

	var	BallSize = 30;var ActiveBalls = 1;

	function BallInit(i){
		Ball[i].X = SpaceShip.X;
		Ball[i].Y = SpaceShip.FP + 50;
		Ball[i].speed = difficulty;Ball[i].angle = 90;
		Ball[i].hits = 0;
		Ball[i].Xmove = -Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
		Ball[i].Ymove = Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
		Ball[i].Xgoing = "Str8";
		Ball[i].Ygoing = "Down";
		Ball[i].StickPos = SpaceShip.width / 2 - 20 + randomGift % 40;
		Ball[i].Sticks = true;BallSize = 30;ChangeMusicSpeed();
	}

	function GenerateExtraBalls(){
		if (ActiveBalls == 1){
			ActiveBalls = 3;

			if (Ball[0].angle == 90){
				Ball[1].angle = 95;
				Ball[1].Xgoing = "Right";
				Ball[2].angle = 95;
				Ball[2].Xgoing = "Left";
			}else{
				Ball[1].angle = Ball[0].angle + 5;
				if (Ball[1].angle > 160)
					Ball[1].angle = Ball[0].angle - 10;
				Ball[1].Xgoing = Ball[0].Xgoing;
					
				Ball[2].angle = Ball[0].angle - 5;
				if (Ball[2].angle < 90){
					Ball[2].angle = 180 - Ball[2].angle;
					if (Ball[0].Xgoing == "Left")
						Ball[2].Xgoing = "Right";
					else
						Ball[2].Xgoing = "Left";
				}else if (Ball[2].angle == 90)
					Ball[2].Xgoing = "Str8";
				else
					Ball[2].Xgoing = Ball[0].Xgoing;
			}
			
			for (var i = 1 ; i < ActiveBalls ; i++){
				Ball[i].X = Ball[0].X;
				Ball[i].Y = Ball[0].Y;
				Ball[i].hits = 0;
				Ball[i].speed = Ball[0].speed;
				Ball[i].Ygoing = Ball[0].Ygoing;
				
				if (Ball[i].Xgoing == "Left" || Ball[i].Xgoing == "Str8")
					Ball[i].Xmove = Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
				else
					Ball[i].Xmove = -Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );

				if (Ball[i].Ygoing == "Down")
					Ball[i].Ymove = Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
				else
					Ball[i].Ymove = -Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
			}
			
		}else if (ActiveBalls == 2){
			ActiveBalls = 3;
			if (Ball[0].Y > Ball[1].Y)
				SwapBalls(0,1);
	
			if (Ball[0].angle == 90){
				Ball[2].angle = 95;
				if (Ball[1].Xgoing == "Right")
					Ball[2].Xgoing = "Left";
				else
					Ball[2].Xgoing = "Right";
			}else{
				Ball[2].angle = Ball[0].angle + 5;
				if (Ball[2].angle > 160)
					Ball[2].angle = Ball[0].angle - 10;
				Ball[2].Xgoing = Ball[0].Xgoing;
			}
	
			Ball[2].X = Ball[0].X;
			Ball[2].Y = Ball[0].Y;
			Ball[2].hits = 0;
			Ball[2].speed = Ball[0].speed;
			Ball[2].Ygoing = Ball[0].Ygoing;
			
			if (Ball[2].Xgoing == "Left")
				Ball[2].Xmove = Ball[2].speed * Math.cos( Ball[2].angle * Math.PI / 180 );
			else
				Ball[2].Xmove = -Ball[2].speed * Math.cos( Ball[2].angle * Math.PI / 180 );

			if (Ball[2].Ygoing == "Down")
				Ball[2].Ymove = Ball[2].speed * Math.sin( Ball[2].angle * Math.PI / 180 );
			else
				Ball[2].Ymove = -Ball[2].speed * Math.sin( Ball[2].angle * Math.PI / 180 );
		}
	}
	
	function CheckBalls(){
		if (ActiveBalls == 3){
			if (Ball[1].Y > Ball[2].Y)
				SwapBalls(1,2);
			if (Ball[0].Y > Ball[2].Y)
				SwapBalls(0,2);
			if (Ball[0].Y > Ball[1].Y)
				SwapBalls(0,1);
			Ball[2].speed = 0;
			ActiveBalls = 2;
			return 2;
		}else if (ActiveBalls == 2){
			if (Ball[0].Y > Ball[1].Y)
				SwapBalls(0,1);
			Ball[1].speed = 0;
			ActiveBalls = 1;
			return 1;
		}else
			return 0;
	}
	
	function SwapBalls(i, j){

		var x = Ball[i].X;
		var y = Ball[i].Y;
		var angle = Ball[i].angle;
		var speed = Ball[i].speed;
		var hits = Ball[i].hits;
		var Xgoing = Ball[i].Xgoing;
		var Ygoing = Ball[i].Ygoing;
		var Xmove = Ball[i].Xmove;
		var Ymove = Ball[i].Ymove;
		var Sticks = Ball[i].Sticks;
		var StickPos = Ball[i].StickPos;

		Ball[i].X = Ball[j].X;
		Ball[i].Y = Ball[j].Y;
		Ball[i].angle = Ball[j].angle;
		Ball[i].speed = Ball[j].speed;
		Ball[i].hits = Ball[j].hits;
		Ball[i].Xgoing = Ball[j].Xgoing;
		Ball[i].Ygoing = Ball[j].Ygoing;
		Ball[i].Xmove = Ball[j].Xmove;
		Ball[i].Ymove = Ball[j].Ymove;
		Ball[i].Sticks = Ball[j].Sticks;
		Ball[i].StickPos = Ball[j].StickPos;

		Ball[j].X = x;
		Ball[j].Y = y;
		Ball[j].angle = angle;
		Ball[j].speed = speed;
		Ball[j].hits = hits;
		Ball[j].Xgoing = Xgoing;
		Ball[j].Ygoing = Ygoing;
		Ball[j].Xmove = Xmove;
		Ball[j].Ymove = Ymove;
		Ball[j].Sticks = Sticks;
		Ball[j].StickPos = StickPos;
	
	}
	
	function SpeedUpBall(i){
		if (Ball[i].speed < difficulty * 2){
			Ball[i].hits++;
			if (Ball[i].hits >= Ball[i].speed * 10){
				ChangeMusicSpeed();
				Ball[i].speed++;
				Ball[i].hits = 0;
			}
		}
	}
	
	function GetHigherSpeed(){
		var speed = Ball[0].speed;
		if (Ball[1].speed > speed)
			speed = Ball[1].speed;
		if (Ball[2].speed > speed)
			speed = Ball[2].speed;
		return speed;
	}
	
	function ChangeBallCourseX(i){
		SpeedUpBall(i);
		if (Ball[i].Xgoing == "Right"){
			Ball[i].Xmove = Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
			Ball[i].Xgoing = "Left";
		}else{
			Ball[i].Xmove = -Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
			Ball[i].Xgoing = "Right";
		}
	}

	function ChangeBallCourseY(i){
		SpeedUpBall(i);
		if (Ball[i].Ygoing == "Down"){
			Ball[i].Ymove = -Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
			Ball[i].Ygoing = "Up";
		}else{
			Ball[i].Ymove = Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
			Ball[i].Ygoing = "Down";
		}
	}
	
	function BallMove(i){
		//                                                  aristero orio  i  deksio orio = allakse poreia X
		if (Ball[i].X + BallSize / 2 > canvasWidth && Ball[i].Xgoing == "Right" || Ball[i].X < BallSize / 2 && Ball[i].Xgoing == "Left"){
			ChangeBallCourseX(i);
		}

		// pano orio = allakse poreia Y
		if (Ball[i].Y < BallSize / 2 && Ball[i].Ygoing == "Up"){
			ChangeBallCourseY(i);
		}
			
		// Xtypima Ball = allakse angle + allakse poreia Y
		if (Ball[i].Y + BallSize / 2 >= SpaceShip.FP + 65 && Ball[i].Y < SpaceShip.FP + SpaceShip.height - Ball[i].speed && Ball[i].X >= SpaceShip.X && Ball[i].X <= SpaceShip.X + SpaceShip.width && Ball[i].Ygoing == "Down"){
			if (SpaceShip.Gift == "Sticky" && Ball[i].Sticks == false){
				Ball[i].Sticks = true;
				Ball[i].StickPos = Ball[i].X - SpaceShip.X;
				StopBoingSound();
			}
			if (Ball[i].Sticks == false){
				PlayBoingSound();
				if (Ball[i].X > SpaceShip.X + SpaceShip.width / 2){
					if (Ball[i].X - (SpaceShip.X + SpaceShip.width / 2) > 70){
						Ball[i].angle = 160;
					}else{
						Ball[i].angle = 90 + (Ball[i].X - (SpaceShip.X + SpaceShip.width / 2));
					}
					Ball[i].Xgoing = "Right";
					Ball[i].Xmove = -Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
				}else if (Ball[i].X < SpaceShip.X + SpaceShip.width / 2){
					if ((SpaceShip.X + SpaceShip.width / 2) - Ball[i].X > 70){
						Ball[i].angle = 160;
					}else{
						Ball[i].angle = 90 + ((SpaceShip.X + SpaceShip.width / 2) - Ball[i].X);
					}
					Ball[i].Xgoing = "Left";
					Ball[i].Xmove = Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
				}else if (Ball[i].X === SpaceShip.X + SpaceShip.width / 2){
					Ball[i].angle = 90;
					Ball[i].Xgoing = "Str8";
					Ball[i].Xmove = Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
				}
				ChangeBallCourseY(i);
			}
		}

		// kato orio
		if (Ball[i].Y - BallSize > canvasHeight){
			if (CheckBalls() == 0){
				PlayOuchSound();
				SpaceShipReset();
				if (ImmortalMode == false)
					SpaceShip.Life--;
				SpaceShip.Gift = "Sticky";
				BallInit(0);
				Gift.type = "0";
			}
		}

		// update to position tou Ball
		if (Ball[i].Sticks == false){
			Ball[i].X += Ball[i].Xmove;
			Ball[i].Y += Ball[i].Ymove;
		}else
			Ball[i].X = SpaceShip.X + Ball[i].StickPos;
	}
	
	
	// UP - DOWN Ball Collider
	function CheckBallColliderY(i){
		if(Ball[i].Ygoing == "Up" && GetPointBrickLife(Ball[i].X, Math.floor(Ball[i].Y - BallSize/2)) > 0){
			ChangeBallCourseY(i);
			CollidePointBrickLife(Ball[i].X, Math.floor(Ball[i].Y - BallSize/2));
		}else if (Ball[i].Ygoing == "Down" && GetPointBrickLife(Ball[i].X, Math.floor(Ball[i].Y + BallSize/2)) > 0){
			ChangeBallCourseY(i);
			CollidePointBrickLife(Ball[i].X, Math.floor(Ball[i].Y + BallSize/2));
		}
	}

	// LEFT - RIGHT Ball Collider
	function CheckBallColliderX(i){
		if ((Ball[i].Xgoing == "Left" || Ball[i].angle < 120) && GetPointBrickLife(Math.floor(Ball[i].X - BallSize/2), Ball[i].Y) > 0){
			if (Ball[i].angle < 120){
				Ball[i].angle = 120;
				Ball[i].Xgoing = "Left";
				if (Ball[i].Ygoing == "Down")
					Ball[i].Ymove = Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
				else
					Ball[i].Ymove = -Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
			}
			ChangeBallCourseX(i);
			CollidePointBrickLife(Math.floor(Ball[i].X - BallSize/2), Ball[i].Y);
		}else if ((Ball[i].Xgoing == "Right" || Ball[i].angle < 120) && GetPointBrickLife(Math.floor(Ball[i].X + BallSize/2), Ball[i].Y) > 0){
			if (Ball[i].angle < 120){
				Ball[i].angle = 120;
				Ball[i].Xgoing = "Right";
				if (Ball[i].Ygoing == "Down")
					Ball[i].Ymove = Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
				else
					Ball[i].Ymove = -Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
			}
			ChangeBallCourseX(i);
			CollidePointBrickLife(Math.floor(Ball[i].X + BallSize/2), Ball[i].Y);
		}
	}
	
	function BallShow(i, context){
		context.drawImage(BallImage, Ball[i].X - (BallSize / 2), Ball[i].Y - (BallSize / 2) , BallSize , BallSize);
	}
	
	// -------------------------------------- Bricks -------------------------------------- //
	var BrickQuantity = 255;
	var BrickWidth = 80;
	var BrickHeight = 30;
	var Focus = 0;

	function Bricks(X, Y, life, color){
		this.X = X;
		this.Y = Y;
		this.life = life;
		this.color = color;
	}

	var Brick = new Array();
	for (var i=0 ; i < BrickQuantity ; i++){
		Brick.push(new Bricks(0,0,0,0));
	}
	for (var j = 0 ; j < BrickQuantity ; j += 15){
		for (var i = 0 ; i < 15 ; i++){
			Brick[i + j].X = i * BrickWidth;
			Brick[i + j].Y = (j / 15) * BrickHeight;
		}
	}
	
	function BrickInit(){
		for (var i=0 ; i < BrickQuantity ; i++){
			Brick[i].life = 0;
			Brick[i].color = 0;
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

	function PaintBrick(i, color){
		if (color == "Red"){
			Brick[i].color = 0;
			Brick[i].life = 1;
		}
		else if (color == "Yellow"){
			Brick[i].color = 1;
			Brick[i].life = 1;
		}
		else if (color == "Blue"){
			Brick[i].color = 2;
			Brick[i].life = 1;
		}
		else if (color == "Green"){
			Brick[i].color = 3;
			Brick[i].life = 1;
		}
		else if (color == "Orange"){
			Brick[i].color = 4;
			Brick[i].life = 1;
		}
		else if (color == "Purple"){
			Brick[i].color = 5;
			Brick[i].life = 1;
		}
		else if (color == "Pink"){
			Brick[i].color = 6;
			Brick[i].life = 1;
		}
		else if (color == "DarkPink"){
			Brick[i].color = 7;
			Brick[i].life = 1;
		}
		else if (color == "Turquoise"){
			Brick[i].color = 8;
			Brick[i].life = 1;
		}
		else if (color == "White"){
			Brick[i].color = 9;
			Brick[i].life = 2;
		}
		else if (color == "Gray"){
			Brick[i].color = 10;
			Brick[i].life = 5;
		}
	}

	function BricksShow(context){
		for (var i = 0 ; i < BrickQuantity ; i++){
			if (Brick[i].life > 0){
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
					if (Brick[i].life == 2)
						context.drawImage( WhiteBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
					else
						context.drawImage( WhiteBrickBrokenImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				else if (Brick[i].color == 10){
					context.drawImage( GrayBrickImage , Brick[i].X , Brick[i].Y , BrickWidth , BrickHeight );
				}
			}
		}
	}
	
	// Detect Brick life for collision from point
	function GetPointBrickLife(x,y){
		if (x < 0 || y < 0 || x > canvasWidth || y > Brick[254].Y + BrickHeight)
			return 0;
		else
			return Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].life;
	}

	// Collide with the Brick point
	function CollidePointBrickLife(x,y){
		if (Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].life == 1){
			PlayPlopSound();
			Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].life--;
			LevelLife--;
			Lucky(Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].X, Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].Y);
			if (ImmortalMode == false)
				Score += Math.floor(10 * GetHigherSpeed());
		}else if (Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].life == 2){
			PlayCrackSound();
			Brick[Math.floor(y / BrickHeight) * 15 + Math.floor(x / BrickWidth)].life--;
			LevelLife--;
			if (ImmortalMode == false)
				Score += Math.floor(5 * GetHigherSpeed());
		}else
			PlayClinkSound();
	}
	
	// -------------------------------------- SpaceShip -------------------------------------- //
	var SpaceShipImage = new Image();
		SpaceShipImage.src = "Assets/SpaceShip.png";

	var SpaceShipBoingImage1 = new Image();
		SpaceShipBoingImage1.src = "Assets/SpaceShipBoing1.png";
	var SpaceShipBoingImage2 = new Image();
		SpaceShipBoingImage2.src = "Assets/SpaceShipBoing2.png";
		
	var SpaceShipGunImage = new Image();
		SpaceShipGunImage.src = "Assets/SpaceShipGun.png";
		
	var SpaceShipGunBoingImage1 = new Image();
		SpaceShipGunBoingImage1.src = "Assets/SpaceShipGunBoing1.png";
	var SpaceShipGunBoingImage2 = new Image();
		SpaceShipGunBoingImage2.src = "Assets/SpaceShipGunBoing2.png";

	var SpaceShipStickyImage = new Image();
		SpaceShipStickyImage.src = "Assets/SpaceShipSticky.png";

	var SpaceShip = { width : 0 , height : 0 , X : 0 , FP : 0 , Frame : 0 , Gift : "None" , Life : 0 };

	function SpaceShipInit(){
 		SpaceShip.width = 200;
		SpaceShip.height = 100;
		SpaceShip.X = 500;
		SpaceShip.FP = canvasHeight - 150;
		SpaceShip.Gift = "Sticky";
	}
	
	function SpaceShipReset(){
 		SpaceShip.width = 200;
		SpaceShip.height = 100;
		SpaceShip.Gift = "None";
		for (var i = 0 ; i < ActiveBalls ; i++)
			Ball[i].Sticks = false;
	}
	
	function SpaceShipShow(context){
		if (SpaceShip.Gift == "Gun"){
			if (!Boing1.paused || !Boing2.paused || !Boing3.paused){
				if (SpaceShip.Frame == 0){
					context.drawImage(SpaceShipGunBoingImage2 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 1;
				}
				else if (SpaceShip.Frame == 1){
					context.drawImage(SpaceShipGunImage , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 0;
				}
			}
			else if (!Boing4.paused || !Boing5.paused){
				if (SpaceShip.Frame == 0){
					context.drawImage(SpaceShipGunBoingImage2 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 1;
				}
				else if (SpaceShip.Frame == 1){
					context.drawImage(SpaceShipGunBoingImage1 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 0;
				}
			}else{
				context.drawImage(SpaceShipGunImage , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
				SpaceShip.Frame = 0;
			}
		}else{
			if (!Boing1.paused || !Boing2.paused || !Boing3.paused){
				if (SpaceShip.Frame == 0){
					context.drawImage(SpaceShipBoingImage2 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 1;
				}
				else if (SpaceShip.Frame == 1){
					context.drawImage(SpaceShipImage , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 0;
				}
			}
			else if (!Boing4.paused || !Boing5.paused){
				if (SpaceShip.Frame == 0){
					context.drawImage(SpaceShipBoingImage2 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 1;
				}
				else if (SpaceShip.Frame == 1){
					context.drawImage(SpaceShipBoingImage1 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
					SpaceShip.Frame = 0;
				}
			}else{
				if (Ball[0].Sticks == true || Ball[1].Sticks == true || Ball[2].Sticks == true)
					context.drawImage(SpaceShipBoingImage2 , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
				else
					context.drawImage(SpaceShipImage , SpaceShip.X , SpaceShip.FP , SpaceShip.width , SpaceShip.height );		
				SpaceShip.Frame = 0;
			}
		}
	}

	// -------------------------------------- Lives -------------------------------------- //
	var LivesImage = new Image();
		LivesImage.src = "Assets/Lives.png";

	var ImmortalImage = new Image();
		ImmortalImage.src = "Assets/immortal.png";
		
	var	LivesWidth = 65;
	var LivesHeight = 40;
	
	function LivesShow(context){
		if (ImmortalMode == false)
			for (var i = 0 ; i < SpaceShip.Life ; i++)
				context.drawImage(LivesImage , i * LivesWidth + 5 , canvasHeight - LivesHeight - 5 , LivesWidth , LivesHeight );		
		else
			context.drawImage(ImmortalImage , 5 , canvasHeight - 40 , 250 , 35 );		
	}
	// -------------------------------------- Bullets -------------------------------------- //
	var BulletImage = new Image();
		BulletImage.src = "Assets/Bullet.png";

	var BulletHeight = 30;
	var BulletWidth = 15;
	var Shot = 0;
	var TotalBullets = 20;
	var BulletSpeed = 15;
	
	function BulletObj(X,Y,fired){
		this.X = X;
		this.Y = Y;
		this.fired = fired;
	}	
		
	var Bullet = [];

	for (var i=0 ; i < TotalBullets ; i++)
		Bullet.push(new BulletObj(0,0,false));

	function Fire(){
		PlayDoingSound();

		if (Shot >= TotalBullets - 1)
			Shot = 0;
				
		if (SpaceShip.X >= -41){
			Bullet[Shot].X = SpaceShip.X + 42;
			Bullet[Shot].Y = SpaceShip.FP;
			Bullet[Shot].fired = true;
			Shot += 1;
		}			

		if (SpaceShip.X <= 1041){
			Bullet[Shot].X = SpaceShip.X + 158;
			Bullet[Shot].Y = SpaceShip.FP;
			Bullet[Shot].fired = true;
			Shot += 1;
		}
	}

	function BulletsMove(){
		for (var i=0 ; i < TotalBullets ; i++){
			if (Bullet[i].fired == true){
				Bullet[i].Y = Bullet[i].Y - BulletSpeed;
				for (var j = 16 ; j >= 0 ; j--){
					if (Bullet[i].Y <= Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].Y && Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].life > 0){
						Bullet[i].fired = false;
						if (Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].life < 5){
							LevelLife--;
							Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].life -= 1;
							if (Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].life == 0){
								Lucky(Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].X, Brick[15 * j + Math.floor(Bullet[i].X/BrickWidth)].Y);
								if (ImmortalMode == false)
									Score += Math.floor(10 * GetHigherSpeed());
							}else
								if (ImmortalMode == false)
									Score += Math.floor(5 * GetHigherSpeed());
						}
					}
				}
			}
			if (Bullet[i].Y < -30)
				Bullet[i].fired = false;
		}
	}
	
	function ShowBullets(context){
		for (var i=0 ; i < TotalBullets ; i++)
			if (Bullet[i].fired == true)
				context.drawImage(BulletImage , Bullet[i].X - (BulletWidth / 2) , Bullet[i].Y , BulletWidth , BulletHeight );
	}

	function InitBullets(){
		Shot = 0;
		for (var i=0 ; i < TotalBullets ; i++){
			Bullet[i].fired = false;
			Bullet[i].X = 0;
			Bullet[i].Y = 0;
		}
	}
	
	// -------------------------------------- Gifts -------------------------------------- //
	var ImageL = new Image();
		ImageL.src = "Assets/L.png";
	var ImageG = new Image();
		ImageG.src = "Assets/G.png";
	var Image3gift = new Image();
		Image3gift.src = "Assets/3gift.png";
	var ImageS = new Image();
		ImageS.src = "Assets/S.png";
	var ImageB = new Image();
		ImageB.src = "Assets/B.png";
	var ImageC = new Image();
		ImageC.src = "Assets/C.png";
	var Imagem = new Image();
		Imagem.src = "Assets/m.png";
	var Imageplus = new Image();
		Imageplus.src = "Assets/plus.png";
	var Imageminus = new Image();
		Imageminus.src = "Assets/minus.png";

	var randomGift = 0;

	function RandomizeGifts(){
		randomGift = Math.floor((Math.random()*1000)+1);
	}
		
	var Gift = {X:0 , Y:0 , type:"0" , size:50 , speed:3};
	
	function GiveGift(X,Y,type){
		Gift.X = X + 27.5;
		Gift.Y = Y + 32.5;
		Gift.type = type;
	}
	
	function Lucky(X,Y){
		if (Gift.type == "0"){
			if ((randomGift < 7 || randomGift > 994) && SpaceShip.Life < 6 && ImmortalMode == false)
				GiveGift(X,Y,"L");
			else if (randomGift >= 111 && randomGift < 141)
				GiveGift(X,Y,"G");
			else if (randomGift >= 161 && randomGift < 191)
				GiveGift(X,Y,"m");
			else if (randomGift >= 211 && randomGift < 241)
				GiveGift(X,Y,"S");
			else if (randomGift >= 361 && randomGift < 391)
				if (BallSize > 90)
					GiveGift(X,Y,"-");
				else
					GiveGift(X,Y,"+");
			else if (randomGift >= 811 && randomGift < 841)
				GiveGift(X,Y,"C");
			else if (randomGift >= 861 && randomGift < 891)
				GiveGift(X,Y,"3");
			else if (randomGift >= 911 && randomGift < 941)
				if (BallSize < 30)
					GiveGift(X,Y,"+");
				else
					GiveGift(X,Y,"-");
			else if (randomGift >= 961 && randomGift < 991)
				GiveGift(X,Y,"B");
		}
	}
	
	function MoveGift(){
		if (Gift.type != "0"){
			if (Gift.Y < canvasHeight + 15)
				Gift.Y = Gift.Y + Gift.speed;
			else
				Gift.type = "0";

			if (Gift.Y >= SpaceShip.FP + 50 && Gift.Y < SpaceShip.FP + SpaceShip.height - 10 && Gift.X >= SpaceShip.X && Gift.X <= SpaceShip.X + SpaceShip.width){
				if (Gift.type != "L")
					SpaceShipReset();
				if (Gift.type == "L")
					SpaceShip.Life++;
				else if (Gift.type == "G"){
					SpaceShip.Gift = "Gun";
					while (ActiveBalls > 1)
						CheckBalls();
				}else if (Gift.type == "3")
					GenerateExtraBalls();
				else if (Gift.type == "S")
					SpaceShip.Gift = "Sticky";
				else if (Gift.type == "B"){
					if (SpaceShip.width == 200)
						SpaceShip.X -= 50;
					else if (SpaceShip.width == 100)
						SpaceShip.X -= 100;
					SpaceShip.width = 300;
				}else if (Gift.type == "C"){
					for (var i = 0 ; i < ActiveBalls ; i++){
						Ball[i].speed = difficulty;
						Ball[i].hits = 0;
						if (Ball[i].Xgoing == "Right")
							Ball[i].Xmove = -Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
						else
							Ball[i].Xmove = Ball[i].speed * Math.cos( Ball[i].angle * Math.PI / 180 );
						if (Ball[i].Ygoing == "Down")
							Ball[i].Ymove = Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
						else
							Ball[i].Ymove = -Ball[i].speed * Math.sin( Ball[i].angle * Math.PI / 180 );
					}
					ChangeMusicSpeed();
				}else if (Gift.type == "m"){
					if (SpaceShip.width == 200)
						SpaceShip.X += 50;
					else if (SpaceShip.width == 300)
						SpaceShip.X += 100;
					SpaceShip.width = 100;
				}else if (Gift.type == "+")
					BallSize += 10;
				else if (Gift.type == "-")
					BallSize -= 10;
				Score += 2 * GetHigherSpeed();
				Gift.type = "0";
			}
		}
	}

	function GiftShow(context){
		if (Gift.type == "L")
			context.drawImage(ImageL , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "G")
			context.drawImage(ImageG , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "3")
			context.drawImage(Image3gift , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "S")
			context.drawImage(ImageS , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "B")
			context.drawImage(ImageB , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "C")
			context.drawImage(ImageC , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "m")
			context.drawImage(Imagem , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "+")
			context.drawImage(Imageplus , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
		else if (Gift.type == "-")
			context.drawImage(Imageminus , Gift.X - 25 , Gift.Y - 25 , Gift.size , Gift.size);
	}
	
	function InitGifts(){
		Gift.X = 0;
		Gift.Y = 0;
		Gift.type = "0";
	}

	// -------------------------------------- Score -------------------------------------- //
	var Score = 0;
	var numPos = 0;
	var tempScore = "0";
	var digits = new Array();
	var nextDigit = 0;
	
	for (var i = 0; i < 20 ; i++)
		digits.push(0);
	
	var ScoreImage = new Image();
		ScoreImage.src = "Assets/Score.png";

	var Image0 = new Image();
		Image0.src = "Assets/0.png";
	var Image1 = new Image();
		Image1.src = "Assets/1.png";
	var Image2 = new Image();
		Image2.src = "Assets/2.png";
	var Image3 = new Image();
		Image3.src = "Assets/3.png";
	var Image4 = new Image();
		Image4.src = "Assets/4.png";
	var Image5 = new Image();
		Image5.src = "Assets/5.png";
	var Image6 = new Image();
		Image6.src = "Assets/6.png";
	var Image7 = new Image();
		Image7.src = "Assets/7.png";
	var Image8 = new Image();
		Image8.src = "Assets/8.png";
	var Image9 = new Image();
		Image9.src = "Assets/9.png";

	function ScoreShow(context){
		if (ImmortalMode == false){
			numPos = canvasWidth - 35;
			if (Score == 0){
				ShowDigits( 0 , context);
			}else{
				tempScore = Math.floor(Score).toString();
				for (var i = tempScore.length-1 ; i >= 0 ; i--)
					ShowDigits(tempScore.charAt(i), context);
			}
			context.drawImage(ScoreImage , numPos - 150 , canvasHeight - 44 , 159 , 35);
		}else{
			context.drawImage(ImmortalImage , canvasWidth - 252 , canvasHeight - 40 , 250 , 35 );		
		}
	}
	
	function ShowDigits(digit,context){
		if (digit == "0"){
			numPos += 3;
			context.drawImage(Image0 , numPos , canvasHeight - 43 , 23 , 33);
		}else if (digit == "1"){
			numPos += 10;
			context.drawImage(Image1 , numPos , canvasHeight - 44 , 15 , 33);
		}else if (digit == "2"){
			numPos += 8;
			context.drawImage(Image2 , numPos , canvasHeight - 43 , 18 , 32);
		}else if (digit == "3"){
			numPos += 7;
			context.drawImage(Image3 , numPos , canvasHeight - 43 , 19 , 33);
		}else if (digit == "4"){
			numPos += 2;
			context.drawImage(Image4 , numPos , canvasHeight - 42 , 24 , 32);
		}else if (digit == "5"){
			numPos += 7;
			context.drawImage(Image5 , numPos , canvasHeight - 43 , 19 , 33);
		}else if (digit == "6"){
			numPos += 5;
			context.drawImage(Image6 , numPos , canvasHeight - 44 , 21 , 34);
		}else if (digit == "7"){
			numPos += 5;
			context.drawImage(Image7 , numPos , canvasHeight - 42 , 21 , 32);
		}else if (digit == "8"){
			numPos += 5;
			context.drawImage(Image8 , numPos , canvasHeight - 43 , 21 , 33);
		}else if (digit == "9"){
			numPos += 5;
			context.drawImage(Image9 , numPos , canvasHeight - 44 , 21 , 33);
		}
		numPos -= 31;
	}
	

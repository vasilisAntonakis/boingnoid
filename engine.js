window.onload = game;
function game(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.font = "40px Arial";
	context.fillStyle = "Yellow";
	
	var game = "start";				// game state
	var canvasX = new Number();		// X point in game
	var canvasY = new Number();		// Y point in game
	
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	// -------------------------------------- Initiation -------------------------------------- //
	function init(){
			// init the SpaceShip
		SpaceShipInit();
			// init the ball
		ActiveBalls = 1;
		BallInit(0);
			// init bullets
		InitBullets();
			// init gifts
		InitGifts();
			// init the level
		SetLevel(Level);
			// init the music
		ChangeMusicSpeed();
		PlayMusic();
	}
	
	PlayMusic();
	InitForms();
	ShowForm(context,game);
	

	// -------------------------------------- Mouse Event Listeners -------------------------------------- //

	canvas.addEventListener('mousemove',mouseMove,true);  // mouse input function
	canvas.addEventListener('mousedown',mouseDown,true);  // mouse input function
	canvas.addEventListener('mouseup',mouseUp,true);  // mouse input function

	function mouseMove(e){
		if (e.x != undefined && e.y != undefined){
			canvasX = e.x - canvas.offsetLeft - 5;
			canvasY = e.y - canvas.offsetTop - 5;
		}else{
			canvasX = e.pageX - canvas.offsetLeft - 5;
			canvasY = e.pageY - canvas.offsetTop - 5;
		}
		if (game == "play"){
			SpaceShip.X = canvasX - SpaceShip.width / 2;
		}else if (game == "start"){
			if (ButtonPressed(PlayButton, canvasX, canvasY) == true ||
			    ButtonPressed(OptionsButton, canvasX, canvasY) == true ||
			    ButtonPressed(AboutButton, canvasX, canvasY) == true)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}else if (game == "pause"){
			if (ButtonPressed(RestartButton, canvasX, canvasY) == true ||
			    ButtonPressed(ResumeButton, canvasX, canvasY) == true)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}else if (game == "gameOver"){
			if (ButtonPressed(RestartButton, canvasX, canvasY) == true ||
			    ButtonPressed(RetryButton, canvasX, canvasY) == true)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}else if (game == "nextLevel"){
			if (ButtonPressed(NextLevelButton, canvasX, canvasY) == true)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}else if (game == "about"){
			if (ButtonPressed(MyLink, canvasX, canvasY) == true ||
				ButtonPressed(OKButton, canvasX, canvasY) == true)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}else if (game == "options"){
			if (ButtonPressed(DiffLink[0], canvasX, canvasY) == true ||
				ButtonPressed(DiffLink[1], canvasX, canvasY) == true ||
				ButtonPressed(DiffLink[2], canvasX, canvasY) == true ||
				ButtonPressed(DiffLink[3], canvasX, canvasY) == true ||
				ButtonPressed(DiffLink[4], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[1], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[2], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[3], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[4], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[5], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[6], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[7], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[8], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[9], canvasX, canvasY) == true ||
				ButtonPressed(OptionDotButton[10], canvasX, canvasY) == true ||
				ButtonPressed(SoundButton, canvasX, canvasY) == true ||
				ButtonPressed(MusicButton, canvasX, canvasY) == true ||
				ButtonPressed(OKButton, canvasX, canvasY) == true ||
				ButtonPressed(TickCursor, canvasX, canvasY) == true ||
				ButtonPressed(TickMode, canvasX, canvasY) == true)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}
	}

	function mouseDown (e){
		if (game == "play"){
			if (SpaceShip.Gift == "Sticky" && (Ball[0].Sticks == true || Ball[1].Sticks == true || Ball[2].Sticks == true)){
				for (var i = 0 ; i < ActiveBalls ; i++)
					Ball[i].Sticks = false;
				SpaceShip.Gift = "None";
			}
			if (SpaceShip.Gift == "Gun")
				Fire();
		}else if (game == "start"){
			if (ButtonPressed(PlayButton, canvasX, canvasY) == true)
				PlayButton.state = "Down";
			if (ButtonPressed(OptionsButton, canvasX, canvasY) == true)
				OptionsButton.state = "Down";
			if (ButtonPressed(AboutButton, canvasX, canvasY) == true)
				AboutButton.state = "Down";
			ShowForm(context,game);
		}else if (game == "pause"){
			if (ButtonPressed(RestartButton, canvasX, canvasY) == true)
				RestartButton.state = "Down";
			if (ButtonPressed(ResumeButton, canvasX, canvasY) == true)
				ResumeButton.state = "Down";
			ShowForm(context,game);
		}else if (game == "gameOver"){
			if (ButtonPressed(RestartButton, canvasX, canvasY) == true)
				RestartButton.state = "Down";
			if (ButtonPressed(RetryButton, canvasX, canvasY) == true)
				RetryButton.state = "Down";
			ShowForm(context,game);
		}else if (game == "nextLevel"){
			if (ButtonPressed(NextLevelButton, canvasX, canvasY) == true)
				NextLevelButton.state = "Down";
			ShowForm(context,game);
		}else if (game == "options"){
			if (ButtonPressed(OKButton, canvasX, canvasY) == true)
				OKButton.state = "Down";
			if (ButtonPressed(SoundButton, canvasX, canvasY) == true)
				if (playSound == true)
					playSound = false;
				else{
					playSound = true;
					PlayBoingSound();
				}
			if (ButtonPressed(MusicButton, canvasX, canvasY) == true)
				if (playMusic == true){
					playMusic = false;
					StopMusic();
				}else{
					playMusic = true;
					PlayMusic();
				}
			for (var i = 0 ; i < 5 ; i++)
				if (ButtonPressed(OptionDotButton[i + 1], canvasX, canvasY) == true)
					if (playSound == false)
						playSound = true;
			if (ButtonPressed(OptionDotButton[1], canvasX, canvasY) == true){
				SoundVolume = 0.2;
				updateSoundVolume();
				PlayBoingSound();
			}else if (ButtonPressed(OptionDotButton[2], canvasX, canvasY) == true){
				SoundVolume = 0.4;
				updateSoundVolume();
				PlayBoingSound();
			}else if (ButtonPressed(OptionDotButton[3], canvasX, canvasY) == true){
				SoundVolume = 0.6;
				updateSoundVolume();
				PlayBoingSound();
			}else if (ButtonPressed(OptionDotButton[4], canvasX, canvasY) == true){
				SoundVolume = 0.8;
				updateSoundVolume();
				PlayBoingSound();
			}else if (ButtonPressed(OptionDotButton[5], canvasX, canvasY) == true){
				SoundVolume = 1;
				updateSoundVolume();
				PlayBoingSound();
			}
			for (var i = 0 ; i < 5 ; i++)
				if (ButtonPressed(OptionDotButton[i + 6], canvasX, canvasY) == true)
					if (playMusic == false){
						playMusic = true;
						PlayMusic();
					}
			if (ButtonPressed(OptionDotButton[6], canvasX, canvasY) == true)
				MusicVolume = 0.2;
			else if (ButtonPressed(OptionDotButton[7], canvasX, canvasY) == true)
				MusicVolume = 0.4;
			else if (ButtonPressed(OptionDotButton[8], canvasX, canvasY) == true)
				MusicVolume = 0.6;
			else if (ButtonPressed(OptionDotButton[9], canvasX, canvasY) == true)
				MusicVolume = 0.8;
			else if (ButtonPressed(OptionDotButton[10], canvasX, canvasY) == true)
				MusicVolume = 1;
			music.volume = MusicVolume;
			for (var i = 0 ; i < 5 ; i++)
				if (ButtonPressed(DiffLink[i], canvasX, canvasY) == true)
					difficulty = DiffLink[i].value;
			if (ButtonPressed(TickCursor, canvasX, canvasY) == true)
				if (showCursor == true)
					showCursor = false;
				else
					showCursor = true;
			if (ButtonPressed(TickMode, canvasX, canvasY) == true)
				if (ImmortalMode == true)
					ImmortalMode = false;
				else
					ImmortalMode = true;
			ShowForm(context,game);
		}else if (game == "about"){
			if (ButtonPressed(OKButton, canvasX, canvasY) == true)
				OKButton.state = "Down";
			if (ButtonPressed(MyLink, canvasX, canvasY) == true)
				window.open('https://www.facebook.com/b.antonakis', '_blank');
			ShowForm(context,game);
		}
	}

	function mouseUp (e){
		if (game == "start"){
			PlayButton.state = "Up";
			OptionsButton.state = "Up";
			AboutButton.state = "Up";
			ShowForm(context,game);
			if (ButtonPressed(PlayButton, canvasX, canvasY) == true){
				Level = 1;
				Score = 0;
				SpaceShip.Life = 3;
				init();
				if (showCursor == false)
					canvas.style.cursor = "none";
				else
					canvas.style.cursor = "default";
				game = "play";
			}
			if (ButtonPressed(OptionsButton, canvasX, canvasY) == true){
				game = "options";
				ShowForm(context,game);
			}
			if (ButtonPressed(AboutButton, canvasX, canvasY) == true){
				game = "about";
				ShowForm(context,game);
			}
		}else if (game == "pause"){
			RestartButton.state = "Up";
			ResumeButton.state = "Up";
			ShowForm(context,game);
			if (ButtonPressed(RestartButton, canvasX, canvasY) == true){
				difficulty = 8;
				PlayMusic();
				game = "start";
				ShowForm(context,game);
			}
			if (ButtonPressed(ResumeButton, canvasX, canvasY) == true){
				PlayMusic();
				if (showCursor == false)
					canvas.style.cursor = "none";
				game = "play";
			}
		}else if (game == "gameOver"){
			RestartButton.state = "Up";
			RetryButton.state = "Up";
			ShowForm(context,game);
			if (ButtonPressed(RestartButton, canvasX, canvasY) == true){
				difficulty = 8;
				if (!GameOverSound.paused){
					GameOverSound.pause();
					GameOverSound.load();
				}
				PlayMusic();
				game = "start";
				ShowForm(context,game);
			}
			if (ButtonPressed(RetryButton, canvasX, canvasY) == true){
				Score = 0;
				SpaceShip.Life = 3;
				init();
				if (showCursor == false)
					canvas.style.cursor = "none";
				else
					canvas.style.cursor = "default";
				if (!GameOverSound.paused){
					GameOverSound.pause();
					GameOverSound.load();
				}
				game = "play";
			}
		}else if (game == "nextLevel"){
			NextLevelButton.state = "Up";
			ShowForm(context,game);
			if (ButtonPressed(NextLevelButton, canvasX, canvasY) == true && game == "nextLevel"){
				Level++;
				difficulty += 0.2;
				init();
				if (showCursor == false)
					canvas.style.cursor = "none";
				if (!Cheer.paused){
					Cheer.pause();
					Cheer.load();
				}
				game = "play";
			}
		}else if (game == "options"){
			OKButton.state = "Up";
			ShowForm(context,game);
			if (ButtonPressed(OKButton, canvasX, canvasY) == true){
				game = "start";
				ShowForm(context,game);
			}
		}else if (game == "about"){
			OKButton.state = "Up";
			ShowForm(context,game);
			if (ButtonPressed(OKButton, canvasX, canvasY) == true){
				game = "start";
				ShowForm(context,game);
			}
		}
	}
	// -------------------------------------- Keyboard Listener -------------------------------------- //
	window.onkeyup = function (e){
		if (e.keyCode == 27){
			if (game == "play"){
				StopMusic();
				if (showCursor == false)
					canvas.style.cursor = "default";
				game = "pause";
				ShowForm(context,game);
			}else if (game == "pause"){
				PlayMusic();
				if (showCursor == false)
					canvas.style.cursor = "none";
				game = "play";
			}		
		}
	}

	// -------------------------------------- Window Focus -------------------------------------- //
	window.onblur = function (){
		StopMusic();
		if (showCursor == false)
			canvas.style.cursor = "default";
		if (game == "play"){
			game = "pause";
			ShowForm(context,game);
		}
	}
	
	window.onfocus = function (){
		if (game == "start" || game == "options" || game == "about"){
			PlayMusic();
		}
	}
	
	// ----------------------------------------------------------------------------------------- //
	// 										 Game Engine 										 //
	// ----------------------------------------------------------------------------------------- //
	
	setInterval(engine,10); // the game engine animation (num = milliseconds)

	function engine(){

		if (game == "play"){

			//------------------------------ Play Calculation -------------------------------------//
			
			RandomizeGifts();
			
			for (var i = 0 ; i < ActiveBalls ; i++){
				// Move the Balls
				BallMove(i);
				
				// check colliders
				CheckBallColliderX(i);				
				CheckBallColliderY(i);				
			}

			BulletsMove();
		
			MoveGift();
			
			// --------------------------------- Animation --------------------------------- //
			
			RefreshFrame(context);
			
			// Level Indication
			LevelShow(context);

			// draw lives
			LivesShow(context);

			// draw Score
			ScoreShow(context);

			// draw Bricks
			BricksShow(context);
			
			// draw the Bullets
			if (SpaceShip.Gift == "Gun")
				ShowBullets(context);
			
			// draw SpaceShip
			SpaceShipShow(context);

			// draw the Gift
			GiftShow(context);
			
			// draw Ball
			for (var i = 0 ; i < ActiveBalls ; i++)
				BallShow(i,context);
			
			if (showCursor == false)
				WarnCursor(canvasX,canvasY,context);
			
			// --------------------------------- Stop Play (game over - next level - pause)--------------------------------- //
				
			if (SpaceShip.Life == -1){
				GameOverForm.Y = 910;
				RetryButton.Y = GameOverForm.Y + 246;
				RestartButton.Y = GameOverForm.Y + 358;
				StopMusic();
				if (playSound == true)
					GameOverSound.play();
				game = "gameOver";
				canvas.style.cursor = "default";
				ShowForm(context,game);
			}
			
			if (LevelLife == 0){
				LevelClear.Y = -510;
				NextLevelButton.Y = LevelClear.Y + 382;
				StopMusic();
				if (playSound == true)
					Cheer.play();
				game = "nextLevel";
				canvas.style.cursor = "default";
				ShowForm(context,game);
			}
			
			// --------------------------------- Next Level Form Animation --------------------------------- //
		}else if (game == "nextLevel"){
			if (LevelClear.Y < (canvasHeight - LevelClear.height) / 2){
				LevelClear.Y += 20;
				NextLevelButton.Y = LevelClear.Y + 382;
				ShowForm(context, game);
			}

			// --------------------------------- Game Over Form Animation --------------------------------- //
		}else if (game == "gameOver"){
			if (GameOverForm.Y > (canvasHeight - GameOverForm.height) / 2){
				GameOverForm.Y -= 4;
				RetryButton.Y = GameOverForm.Y + 246;
				RestartButton.Y = GameOverForm.Y + 358;
				ShowForm(context, game);
			}
		}
	}
}
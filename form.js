	// -------------------------------------- Background -------------------------------------- //
	function RefreshFrame(context){
		// clear canvas
		context.clearRect( 0 , 0 , canvasWidth , canvasHeight );	// clear frame

	}
	// -------------------------------------- Cursor Warning -------------------------------------- //
	var CursorHighImage = new Image();
		CursorHighImage.src = "Assets/CursorHigh.png";
	
	var CursorLowImage = new Image();
		CursorLowImage.src = "Assets/CursorLow.png";

	
	function WarnCursor(X,Y,context){
		if (Y < 80){
			context.drawImage( CursorHighImage , X - 100 , Y , 200 , 100 );
		}else if (Y > 820){
			context.drawImage( CursorLowImage , X - 100 , Y - 100 , 200 , 100 );
		}
	}

	// -------------------------------------- Form -------------------------------------- //
	var FormImage = new Image();
		FormImage.src = "Assets/Form.png";

	var AboutFormImage = new Image();
		AboutFormImage.src = "Assets/AboutForm.png";

	var OptionsFormImage = new Image();
		OptionsFormImage.src = "Assets/OptionsForm.png";
		
	var Form = {
		width : 700,
		height : 700,
		X : 0,
		Y : 0
	};

	var LevelClearImage = new Image();
		LevelClearImage.src = "Assets/LevelClear.png";
		
	var LevelClear = {
		width : 1000,
		height : 500,
		X : 0,
		Y : 0
	};

	var PauseFormImage = new Image();
		PauseFormImage.src = "Assets/PauseForm.png";

	var PauseForm = {
		width : 850,
		height : 475,
		X : 0,
		Y : 0
	};
		
	var GameOverFormImage = new Image();
		GameOverFormImage.src = "Assets/GameOverForm.png";

	var GameOverForm = {
		width : 850,
		height : 475,
		X : 0,
		Y : 0
	};
		
	function InitForms(){
		Form.X = (canvasWidth - Form.width) / 2;
		Form.Y = (canvasHeight - Form.height) / 2;
		LevelClear.X = (canvasWidth - LevelClear.width) / 2;
		LevelClear.Y = -510;
		PauseForm.X = (canvasWidth - PauseForm.width) / 2;
		PauseForm.Y = (canvasHeight - PauseForm.height) / 2;
		GameOverForm.X = (canvasWidth - GameOverForm.width) / 2;
		GameOverForm.Y = 910;
		InitPlayButton();
		InitOptionsButton();
		InitAboutButton();
		InitOKButton();
		InitNextLevelButton();
		InitRestartButton();
		InitRetryButton();
		InitResumeButton();
		InitLinks();
		InitOptions();
	}
	
	function ShowForm(context, game){

		// refresh the frame
		RefreshFrame(context);

		if (game == "start"){
			// show the start form
			context.drawImage( FormImage , Form.X , Form.Y , Form.width , Form.height );
			
			// show the play button
			PlayButtonShow(context);

			// show the options button
			OptionsButtonShow(context);

			// show the instructions button
			AboutButtonShow(context);

		}else if (game == "nextLevel"){
			// show the next level form
			context.drawImage( LevelClearImage , LevelClear.X , LevelClear.Y , LevelClear.width , LevelClear.height );
			
			// show the next level button
			NextLevelButtonShow(context);
		}else if (game == "about"){
			// show the about form
			context.drawImage( AboutFormImage , Form.X , Form.Y , Form.width , Form.height );
			
			// show the OK button
			OKButtonShow(context, game);

		}else if (game == "options"){
			// show the about form
			context.drawImage( OptionsFormImage , Form.X , Form.Y , Form.width , Form.height );

			// show the options
			OptionsShow(context);
			
			// show the OK button
			OKButtonShow(context, game);

		}else if (game == "gameOver"){
			// show the game over form
			context.drawImage( GameOverFormImage , GameOverForm.X , GameOverForm.Y , GameOverForm.width , GameOverForm.height );

			// show the retry button
			RetryButtonShow(context);

			// show the restart button
			RestartButtonShow(context);
			
		}else if (game == "pause"){
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

			// show the game over form
			context.drawImage( PauseFormImage , PauseForm.X , PauseForm.Y , PauseForm.width , PauseForm.height );
				
			// show the resume button
			ResumeButtonShow(context);

			// show the restart button
			RestartButton.Y = PauseForm.Y + 358;
			RestartButtonShow(context);
		}
	}
	
	// -------------------------------------- Button Functions -------------------------------------- //
	
	function ButtonPressed (Button,X,Y){
		if (X >= Button.X && X <= Button.X + Button.width && Y >= Button.Y && Y <= Button.Y + Button.height)
			return true;
		else
			return false;
	}

	// -------------------------------------- OK Button -------------------------------------- //
	var OKButtonImage_Down = new Image();
		OKButtonImage_Down.src = "Assets/ButtonOKD.png";
	var	OKButtonImage_Up = new Image();
		OKButtonImage_Up.src = "Assets/ButtonOKU.png";

	var OKButton = {
		state : "Up",
		width : 200,
		height : 50,
		X : 0,
		Y : 0
	};
	
	function InitOKButton(){
		OKButton.X = Form.X + 250;
		OKButton.Y = Form.Y + 620;
	}
	
	function OKButtonShow(context,game){
		if (OKButton.state == "Up"){
			context.drawImage( OKButtonImage_Up , OKButton.X , OKButton.Y , OKButton.width , OKButton.height );
		}else{
			context.drawImage( OKButtonImage_Down , OKButton.X , OKButton.Y , OKButton.width , OKButton.height );
		}
	}
	
	// -------------------------------------- PlayButton -------------------------------------- //
	var PlayButtonImage_Down = new Image();
		PlayButtonImage_Down.src = "Assets/ButtonPlayD.png";
	var	PlayButtonImage_Up = new Image();
		PlayButtonImage_Up.src = "Assets/ButtonPlayU.png";

	var PlayButton = {
		state : "Up",
		width : 360,
		height : 90,
		X : 0,
		Y : 0
	};
	
	function InitPlayButton(){
		PlayButton.X = Form.X + 171;
		PlayButton.Y = Form.Y + 351;
	}
	
	function PlayButtonShow(context){
		if (PlayButton.state == "Up"){
			context.drawImage( PlayButtonImage_Up , PlayButton.X , PlayButton.Y , PlayButton.width , PlayButton.height );
		}else{
			context.drawImage( PlayButtonImage_Down , PlayButton.X , PlayButton.Y , PlayButton.width , PlayButton.height );
		}
	}

	// -------------------------------------- OptionsButton -------------------------------------- //
	var OptionsButtonImage_Down = new Image();
		OptionsButtonImage_Down.src = "Assets/ButtonOptionsD.png";
	var	OptionsButtonImage_Up = new Image();
		OptionsButtonImage_Up.src = "Assets/ButtonOptionsU.png";

	var OptionsButton = {
		state : "Up",
		width : 300,
		height : 75,
		X : 0,
		Y : 0
	};
	
	function InitOptionsButton(){
		OptionsButton.X = Form.X + 201;
		OptionsButton.Y = Form.Y + 462;
	}
	
	function OptionsButtonShow(context){
		if (OptionsButton.state == "Up"){
			context.drawImage( OptionsButtonImage_Up , OptionsButton.X , OptionsButton.Y , OptionsButton.width , OptionsButton.height );
		}else{
			context.drawImage( OptionsButtonImage_Down , OptionsButton.X , OptionsButton.Y , OptionsButton.width , OptionsButton.height );
		}
	}

	// -------------------------------------- AboutButton -------------------------------------- //
	var AboutButtonImage_Down = new Image();
		AboutButtonImage_Down.src = "Assets/ButtonAboutD.png";
	var	AboutButtonImage_Up = new Image();
		AboutButtonImage_Up.src = "Assets/ButtonAboutU.png";

	var AboutButton = {
		state : "Up",
		width : 300,
		height : 75,
		X : 0,
		Y : 0
	};
	
	function InitAboutButton(){
		AboutButton.X = Form.X + 201;
		AboutButton.Y = Form.Y + 557;
	}
	
	function AboutButtonShow(context){
		if (AboutButton.state == "Up"){
			context.drawImage( AboutButtonImage_Up , AboutButton.X , AboutButton.Y , AboutButton.width , AboutButton.height );
		}else{
			context.drawImage( AboutButtonImage_Down , AboutButton.X , AboutButton.Y , AboutButton.width , AboutButton.height );
		}
	}
	
	function MyLink(X,Y){
		if (X >= 420 && X <= 574 && Y >= 322 && Y <= 345)
			return true;
		else
			return false;
	}

	// -------------------------------------- NextLevelButton -------------------------------------- //
	var NextLevelButtonImage_Down = new Image();
		NextLevelButtonImage_Down.src = "Assets/ButtonNextLevelD.png";
	var	NextLevelButtonImage_Up = new Image();
		NextLevelButtonImage_Up.src = "Assets/ButtonNextLevelU.png";

	var NextLevelButton = {
		state : "Up",
		width : 360,
		height : 90,
		X : 0,
		Y : 0
	};
	
	function InitNextLevelButton(){
		NextLevelButton.X = LevelClear.X + 320;
		NextLevelButton.Y = LevelClear.Y + 382;
	}
	
	function NextLevelButtonShow(context){
		if (NextLevelButton.state == "Up"){
			context.drawImage( NextLevelButtonImage_Up , NextLevelButton.X , NextLevelButton.Y , NextLevelButton.width , NextLevelButton.height );
		}else{
			context.drawImage( NextLevelButtonImage_Down , NextLevelButton.X , NextLevelButton.Y , NextLevelButton.width , NextLevelButton.height );
		}
	}

	// -------------------------------------- Restart Button -------------------------------------- //
	var RestartButtonImage_Down = new Image();
		RestartButtonImage_Down.src = "Assets/ButtonRestartD.png";
	var	RestartButtonImage_Up = new Image();
		RestartButtonImage_Up.src = "Assets/ButtonRestartU.png";

	var RestartButton = {
		state : "Up",
		width : 360,
		height : 90,
		X : 0,
		Y : 0
	};
	
	function InitRestartButton(){
		RestartButton.X = GameOverForm.X + 245;
		RestartButton.Y = GameOverForm.Y + 358;
	}
	
	function RestartButtonShow(context){
		if (RestartButton.state == "Up"){
			context.drawImage( RestartButtonImage_Up , RestartButton.X , RestartButton.Y , RestartButton.width , RestartButton.height );
		}else{
			context.drawImage( RestartButtonImage_Down , RestartButton.X , RestartButton.Y , RestartButton.width , RestartButton.height );
		}
	}

	// -------------------------------------- Retry Button -------------------------------------- //
	var RetryButtonImage_Down = new Image();
		RetryButtonImage_Down.src = "Assets/ButtonRetryD.png";
	var	RetryButtonImage_Up = new Image();
		RetryButtonImage_Up.src = "Assets/ButtonRetryU.png";

	var RetryButton = {
		state : "Up",
		width : 360,
		height : 90,
		X : 0,
		Y : 0
	};
	
	function InitRetryButton(){
		RetryButton.X = GameOverForm.X + 245;
		RetryButton.Y = GameOverForm.Y + 246;
	}
	
	function RetryButtonShow(context){
		if (RetryButton.state == "Up"){
			context.drawImage( RetryButtonImage_Up , RetryButton.X , RetryButton.Y , RetryButton.width , RetryButton.height );
		}else{
			context.drawImage( RetryButtonImage_Down , RetryButton.X , RetryButton.Y , RetryButton.width , RetryButton.height );
		}
	}
	
	// -------------------------------------- Resume Button -------------------------------------- //
	var ResumeButtonImage_Down = new Image();
		ResumeButtonImage_Down.src = "Assets/ButtonResumeD.png";
	var	ResumeButtonImage_Up = new Image();
		ResumeButtonImage_Up.src = "Assets/ButtonResumeU.png";

	var ResumeButton = {
		state : "Up",
		width : 360,
		height : 90,
		X : 0,
		Y : 0
	};
	
	function InitResumeButton(){
		ResumeButton.X = PauseForm.X + 245;
		ResumeButton.Y = PauseForm.Y + 246;
	}
	
	function ResumeButtonShow(context){
		if (ResumeButton.state == "Up"){
			context.drawImage( ResumeButtonImage_Up , ResumeButton.X , ResumeButton.Y , ResumeButton.width , ResumeButton.height );
		}else{
			context.drawImage( ResumeButtonImage_Down , ResumeButton.X , ResumeButton.Y , ResumeButton.width , ResumeButton.height );
		}
	}

	// -------------------------------------- Options -------------------------------------- //
	var SoundButtonImage = new Image();
		SoundButtonImage.src = "Assets/ButtonSound.png";
	var MusicButtonImage = new Image();
		MusicButtonImage.src = "Assets/ButtonMusic.png";
	var OptionDotButtonImage = new Image();
		OptionDotButtonImage.src = "Assets/ButtonOptionDot.png";
	
	var SoundButton = {
		width : 75,
		height : 75,
		X : 0,
		Y : 0
	};

	var MusicButton = {
		width : 75,
		height : 75,
		X : 0,
		Y : 0
	};

	function OptionDotObj (width,height,X,Y) {
		this.width = width;
		this.height = height;
		this.X = X;
		this.Y = Y;
	};

	var OptionDotButton = new Array();
	for (var i = 0 ; i < 11 ; i++)
		OptionDotButton.push(new OptionDotObj(30,30,0,0));
		
	function DiffLinkObj (width,height,X,Y,value){
		this.width = width;
		this.height = height;
		this.X = X;
		this.Y = Y;
		this.value = value;
	};
	
	var DiffLink = new Array();

	DiffLink[0] = new DiffLinkObj(160,38,0,0,3);
	DiffLink[1] = new DiffLinkObj(160,38,0,0,5);
	DiffLink[2] = new DiffLinkObj(160,38,0,0,8);
	DiffLink[3] = new DiffLinkObj(160,38,0,0,12);
	DiffLink[4] = new DiffLinkObj(160,38,0,0,17);
	
	var TickImage = new Image();
		TickImage.src = "Assets/tick.png";
	
	var showCursor = false;
	
	var TickCursor = {
		width : 30,
		height : 30,
		X : 0,
		Y : 0
	};

	var ImmortalMode = false;
	
	var TickMode = {
		width : 30,
		height : 30,
		X : 0,
		Y : 0
	};
	
	function InitOptions(){
		SoundButton.X = Form.X + 338.6;
		SoundButton.Y = Form.Y + 302;

		MusicButton.X = Form.X + 338.6;
		MusicButton.Y = Form.Y + 421;
		
		OptionDotButton[0].X = Form.X + 114;
		OptionDotButton[0].Y = Form.Y + 384;

		for (var i = 0 ; i < 5 ; i++){
			OptionDotButton[i + 1].X = Form.X + 418 + 33.6 * i;
			OptionDotButton[i + 1].Y = Form.Y + 324.5;
		}

		for (var i = 0 ; i < 5 ; i++){
			OptionDotButton[i + 6].X = Form.X + 418 + 33.6 * i;
			OptionDotButton[i + 6].Y = Form.Y + 443.5;
		}

		for (var i = 0 ; i < 5 ; i++){
			DiffLink[i].X = Form.X + 153;
			DiffLink[i].Y = Form.Y + 302 + 39 * i;
		}
		
		TickCursor.X = Form.X + 153;
		TickCursor.Y = Form.Y + 519;
		
		TickMode.X = Form.X + 153;
		TickMode.Y = Form.Y + 572;
	
	}
	
	function OptionsShow(context){
		if (difficulty == 3)
			OptionDotButton[0].Y = Form.Y + 306;
		else if (difficulty == 5)
			OptionDotButton[0].Y = Form.Y + 345;
		else if (difficulty == 8)
			OptionDotButton[0].Y = Form.Y + 384;
		else if (difficulty == 12)
			OptionDotButton[0].Y = Form.Y + 423;
		else if (difficulty == 17)
			OptionDotButton[0].Y = Form.Y + 462;
		
		context.drawImage( OptionDotButtonImage , OptionDotButton[0].X , OptionDotButton[0].Y , OptionDotButton[0].width , OptionDotButton[0].height );

		if (playSound == true){

			context.drawImage( SoundButtonImage , SoundButton.X , SoundButton.Y , SoundButton.width , SoundButton.height );

			if (SoundVolume == 0.2)
				for (var i = 1 ; i < 2 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (SoundVolume == 0.4)
				for (var i = 1 ; i < 3 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (SoundVolume == 0.6)
				for (var i = 1 ; i < 4 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (SoundVolume == 0.8)
				for (var i = 1 ; i < 5 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (SoundVolume == 1)
				for (var i = 1 ; i < 6 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
		}

		if (playMusic == true){
		
			context.drawImage( MusicButtonImage , MusicButton.X , MusicButton.Y , MusicButton.width , MusicButton.height );
	
			if (MusicVolume == 0.2)
				for (var i = 6 ; i < 7 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (MusicVolume == 0.4)
				for (var i = 6 ; i < 8 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (MusicVolume == 0.6)
				for (var i = 6 ; i < 9 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (MusicVolume == 0.8)
				for (var i = 6 ; i < 10 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
			else if (MusicVolume == 1)
				for (var i = 6 ; i < 11 ; i++)
					context.drawImage( OptionDotButtonImage , OptionDotButton[i].X , OptionDotButton[i].Y , OptionDotButton[i].width , OptionDotButton[i].height );
		}
		
		if (showCursor == false)
			context.drawImage( TickImage , TickCursor.X + 3 , TickCursor.Y - 3, 30 , 30 );

		if (ImmortalMode == true)
			context.drawImage( TickImage , TickMode.X + 3, TickMode.Y - 3, 30 , 30 );

			
	}
	
	// -------------------------------------- Links -------------------------------------- //
	var MyLink = {
		width : 118,
		height : 26,
		X : 0,
		Y : 0
	};

	function InitLinks(){
		MyLink.X = Form.X + 286;
		MyLink.Y = Form.Y + 309;
	}
	
	
	var playMusic = true;
	var MusicVolume = 1;

	var playSound = true;
	var SoundVolume = 1;

	function updateSoundVolume(){
		Plop1.volume = SoundVolume;
		Plop2.volume = SoundVolume;
		Plop3.volume = SoundVolume;
		Plop4.volume = SoundVolume;
		Plop5.volume = SoundVolume;

		Boing1.volume = SoundVolume;
		Boing2.volume = SoundVolume;
		Boing3.volume = SoundVolume;
		Boing4.volume = SoundVolume;
		Boing5.volume = SoundVolume;

		Crack1.volume = SoundVolume;
		Crack2.volume = SoundVolume;

		Clink1.volume = SoundVolume;
		Clink2.volume = SoundVolume;
		Clink3.volume = SoundVolume;

		Doing1.volume = SoundVolume;
		Doing2.volume = SoundVolume;
		Doing3.volume = SoundVolume;
		Doing4.volume = SoundVolume;
		Doing5.volume = SoundVolume;
		
		Ouch1.volume = SoundVolume;
		Ouch2.volume = SoundVolume;

		Cheer.volume = SoundVolume;
		GameOverSound = SoundVolume;
	}
	
	// ---------------------------------- music ---------------------------------- //

	var music = new Audio();
		music.src = "Assets/music.mp3";
		music.loop = true;
		music.playbackRate = 1;
	
	function ChangeMusicSpeed(){
		music.playbackRate = GetHigherSpeed() / difficulty;
	}
	
	function PlayMusic(){
		music.load();
		if (playMusic == true)
			music.play();
	}
	
	function StopMusic(){
		music.pause();
	}
	
	
	// ---------------------------------- plop sounds - Ball Brick Pop ---------------------------------- //

	var Plop1 = new Audio();
		Plop1.src = "Assets/plop1.mp3";
	var Plop2 = new Audio();
		Plop2.src = "Assets/plop2.mp3";
	var Plop3 = new Audio();
		Plop3.src = "Assets/plop3.mp3";
	var Plop4 = new Audio();
		Plop4.src = "Assets/plop4.mp3";
	var Plop5 = new Audio();
		Plop5.src = "Assets/plop5.mp3";

	var randomPlop = 0;

	function PlayPlopSound(){      // plop sound function
		if (playSound == true){
			randomPlop = Math.floor((Math.random()*5)+1);

			if (randomPlop == 1){
				Plop1.load();
				Plop1.play();
			}else if (randomPlop == 2){
				Plop2.load();
				Plop2.play();
			}else if (randomPlop == 3){
				Plop3.load();
				Plop3.play();
			}else if (randomPlop == 4){
				Plop4.load();
				Plop4.play();
			}else if (randomPlop == 5){
				Plop5.load();
				Plop5.play();
			}
		}
	}

	// ---------------------------------- boing sounds - ball hits spaceship ---------------------------------- //

	var Boing1 = new Audio();
		Boing1.src = "Assets/boing1.mp3";
	var Boing2 = new Audio();
		Boing2.src = "Assets/boing2.mp3";
	var Boing3 = new Audio();
		Boing3.src = "Assets/boing3.mp3";
	var Boing4 = new Audio();
		Boing4.src = "Assets/boing4.mp3";
	var Boing5 = new Audio();
		Boing5.src = "Assets/boing5.mp3";

	var randomBoing = 0;

	function PlayBoingSound(){		// boing sound function
		if (playSound == true){
		
			randomBoing = Math.floor((Math.random()*8)+1);

			if (randomBoing == 1 || randomBoing == 5){
				Boing1.load();
				Boing1.play();
			}else if (randomBoing == 2 || randomBoing == 6){
				Boing2.load();
				Boing2.play();
			}else if (randomBoing == 3 || randomBoing == 7){
				Boing3.load();
				Boing3.play();
			}else if (randomBoing == 4){
				Boing4.load();
				Boing4.play();
			}else if (randomBoing == 8){
				Boing5.load();
				Boing5.play();
			}
		}
	}

	function StopBoingSound(){
		if (playSound == true){

			if (!Boing1.paused){
				Boing1.pause();
			}
			if (!Boing2.paused){
				Boing2.pause();
			}
			if (!Boing3.paused){
				Boing3.pause();
			}
			if (!Boing4.paused){
				Boing4.pause();
			}
			if (!Boing5.paused){
				Boing5.pause();
			}
		}
	}
	
	// ---------------------------------- crack sounds	- gray bricks 1st hit ---------------------------------- //

	var Crack1 = new Audio();
		Crack1.src = "Assets/crack1.mp3";
	var Crack2 = new Audio();
		Crack2.src = "Assets/crack2.mp3";

	var randomCrack = 0;

	function PlayCrackSound(){		// crack sound function
		if (playSound == true){

			randomCrack = Math.floor((Math.random()*2)+1);

			if (randomCrack == 1){
				Crack1.load();
				Crack1.play();
			}else if (randomCrack == 2){
				Crack2.load();
				Crack2.play();
			}
		}
	}

	// ---------------------------------- clink sounds - black bricks unbreakable ---------------------------------- //

	var Clink1 = new Audio();
		Clink1.src = "Assets/clink1.mp3";
	var Clink2 = new Audio();
		Clink2.src = "Assets/clink2.mp3";
	var Clink3 = new Audio();
		Clink3.src = "Assets/clink3.mp3";

	var randomClink = 0;

	function PlayClinkSound(){		// clink sound function
		if (playSound == true){

			randomClink = Math.floor((Math.random()*3)+1);

			if (randomClink == 1){
				Clink1.load();
				Clink1.play();
			}else if (randomClink == 2){
				Clink2.load();
				Clink2.play();
			}else if (randomClink == 3){
				Clink3.load();
				Clink3.play();
			}
		}
	}
	
	// ---------------------------------- doing sounds - Gun Brick Pop ---------------------------------- //
	
	var Doing1 = new Audio();
		Doing1.src = "Assets/doing1.mp3";
	var Doing2 = new Audio();
		Doing2.src = "Assets/doing2.mp3";
	var Doing3 = new Audio();
		Doing3.src = "Assets/doing3.mp3";
	var Doing4 = new Audio();
		Doing4.src = "Assets/doing4.mp3";
	var Doing5 = new Audio();
		Doing5.src = "Assets/doing5.mp3";
		
	var randomDoing = 0;

	function PlayDoingSound(){			// doing sound function
		if (playSound == true){
	
			randomDoing = Math.floor((Math.random()*5)+1);
		
			if (randomDoing == 1){
				Doing1.load();
				Doing1.play();
			}else if (randomDoing == 2){
				Doing2.load();
				Doing2.play();
			}else if (randomDoing == 3){
				Doing3.load();
				Doing3.play();
			}else if (randomDoing == 4){
				Doing4.load();
				Doing4.play();
			}else if (randomDoing == 5){
				Doing5.load();
				Doing5.play();
			}
		}
	}
	
	// ---------------------------------- ouch Sounds ---------------------------------- //
	var Ouch1 = new Audio();
		Ouch1.src = "Assets/ouch1.mp3";
	var Ouch2 = new Audio();
		Ouch2.src = "Assets/ouch2.mp3";
	
	var randomOuch = 0;

	function PlayOuchSound(){			// doing sound function
		if (playSound == true){
	
			randomOuch = Math.floor((Math.random()*2)+1);
		
			if (randomOuch == 1){
				Ouch1.load();
				Ouch1.play();
			}else if (randomOuch == 2){
				Ouch2.load();
				Ouch2.play();
			}
		}
	}
	
	// ---------------------------------- Form Sounds ---------------------------------- //
	
	var Cheer = new Audio();
		Cheer.src = "Assets/cheer.mp3";

	var GameOverSound = new Audio();
		GameOverSound.src = "Assets/gameover.mp3";
	
	
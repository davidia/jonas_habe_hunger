window.onload = function() {

	Crafty.init(600, 390);
	
	Crafty.sprite(64, "jonas.png", {
		jonas: [0,0]
	});
	
	Crafty.background("url('bg.jpg') no-repeat");

	Crafty.c("Controls", {
    init: function() {
        this.requires('Multiway');
    },
    
    controls: function(speed) {
        this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
        return this;
    }
    
	});

	var player = Crafty.e("2D, Canvas, jonas, Controls, Collision")
			.attr({move: {left: false, right: false, up: false, down: false}, xspeed: 0, yspeed: 0, decay: 0.9, 
				x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 2, score: 0})
			.origin("center").controls(3)
	

	Crafty.sprite(64, "images/fruit.png", {
		banana: [0,0],
		apple: [1,0],
		watermelon: [2,0],
		orange: [3,0],
		coconut: [4,0],
		lemon: [5,0]
	});


		var scoreEnt = Crafty.e("2D, DOM, Text").attr({x: 5, y: 5, w: Crafty.viewport.width, h: 50}).text("Score: 0"),
		score = 0;


	Crafty.c("Fruit", {
		_choice: ["banana", "apple", "watermelon", "orange", "coconut", "lemon"],
		_xspeed: 0,
		_yspeed: 0,

		init: function() {
			var index = Crafty.math.randomInt(0, 5),
				fruit = this._choice[index],
				rotation = Crafty.math.randomInt(8, 12),
				direction = Crafty.math.randomInt(0, 1);

			this.addComponent(fruit).origin("center");
			this.x = Crafty.math.randomInt(32, 570);
			this.y = Crafty.math.randomInt(32, 360);
			this.z = 1;

			

			
		}
	});

	Crafty.audio.add("eat", "eat.wav");

	function create(){
		Crafty.e("2D, DOM, Fruit, Collision").onHit("jonas", function () {
    //Move unit out of solid tile
    	this.destroy()
    	score += 1;
		scoreEnt.text("Score: "+score);
    	Crafty.audio.play("eat");
    	create();
	})
	}

	create();

	
	// Crafty.e().bind("EnterFrame", function(e) {
	// 	var sparsity = Crafty.math.randomInt(10, 50);
	// 	if(e.frame % sparsity == 0) {
	// 		Crafty.e("2D, DOM, Fruit, Gravity, Mouse").gravity();
	// 	}
	// });


}
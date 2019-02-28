"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
    
    function startGame() {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Game');

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            music.play();
    
            playButton = game.input.keyboard.createCursorKeys();
            game.add.sprite(0, 0, 'titlePage');
    
            //playButton = game.add.button( 303, 400, 'playButton', startGame, null, 'over', 'out', 'down');

            var text = game.add.text( 400, 300, "Return everyone's mail using the arrow or WASD keys. \nYou lose HP when you pick the wrong color key. \nReach 25 points while staying above 0 Health", { fontSize: '25px', fill: '#9999ff' } );
            text.anchor.setTo(0.5,0.5)
            var textT = game.add.text( 50, 550, "To start a new game, press the UP key", { fontSize: '32px', fill: '#9999ff' } );
    
        },
    
        update: function () {
    
            if(playButton.up.isDown){
                startGame()
            }
        }
        
    };
};

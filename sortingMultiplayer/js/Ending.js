"use strict";

GameStates.makeEnding = function( game, shared ) {

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
            
            playButton = game.input.keyboard.createCursorKeys();
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            music.play();
    
            game.add.sprite(0.5, 0.5, 'overScreen');
           // game.sprite.anchor.setTo(0.5,0.5)


    
            
            //var text = game.add.text( 400, 300, "GAMEOVER", { fontSize: '42px', fill: '#9999ff' } );
            //text.anchor.setTo(0.5,0.5)
            var textT = game.add.text( 50, 550, "To start a new game, press the UP key", { fontSize: '32px', fill: '#9999ff' } );
    
        },
    
        update: function () {
    
            if(playButton.up.isDown){
                startGame()
            }
    
        }
        
    };
};

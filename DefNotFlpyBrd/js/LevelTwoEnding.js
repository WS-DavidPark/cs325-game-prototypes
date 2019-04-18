"use strict";

GameStates.makeEnding = function( game, shared ) {

	var music = null;
	var playButton = null;
    var spaceKey
    
    function startGame() {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('LevelOne');

    }
    
    return {
    
        create: function () {
            
            playButton = game.input.keyboard.createCursorKeys();
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            music.play();

            var text = game.add.text( 50, 400, "You made it to " + shared.sharedScore + " seconds", { fontSize: '32px', fill: '#000000' } );
            var textT = game.add.text( 50, 550, "Level Over. Press Up to continue", { fontSize: '32px', fill: '#000000' } );
        },
    
        update: function () {
            if(playButton.up.isDown){
                startGame()
            }
    
        }
        
    };
};

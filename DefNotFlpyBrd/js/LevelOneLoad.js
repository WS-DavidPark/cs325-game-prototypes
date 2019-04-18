"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
    var spaceKey
    var playButton
    
    function startGame() {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('LevelOne');

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
            
            music = game.add.audio('titleMusic');
            music.play();
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            game.add.sprite(0, 0, 'bird');
            playButton = game.input.keyboard.createCursorKeys();
    
            //playButton = game.add.button( 303, 400, 'playButton', startGame, null, 'over', 'out', 'down');

            var text = game.add.text( 600, 50, "Definitely Not Flappy Bird Lvl:1", { fontSize: '25px', fill: '#000000' } );
            text.anchor.setTo(0.5,0.5)
            var textT = game.add.text( 50, 550, "Space key to jump, dodge incoming obsticles. \nGet to the minute mark to get to the next level", { fontSize: '32px', fill: '#000000' } );
    
        },
    
        update: function () {
            if(spaceKey.isDown){
                startGame()
            }
            //if(playButton.down.isDown){
            //    game.state.start('LevelTwoLoad')
            //}
        }
        
    };
};

"use strict";

    let score

    var text
    var textTwo

GameStates.makeGame = function( game, shared ) {
    var music
    // Create your own variables.
    var bouncy = null;
    var mail = null;
    var mailBox = null;
    var control = null;
    var mailBoxes
    var northBox
    var southBox
    var eastBox
    var westBox
    var mail
    var counter

    var mailTwo

    var time = 0
    var health = 3

    var reset = true;
    var direction = 0
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () {
            music = game.add.audio('gameMusic')
            music.play()
            var timer = game.time.create(false);
            timer.loop(100, updateCounter, this);
            timer.start();

            control = game.input.keyboard.createCursorKeys();

            game.physics.startSystem(Phaser.Physics.ARCADE);

            mailBoxes = game.add.group()
            mailBoxes.enableBody = true
            northBox = mailBoxes.create(400,100,'redBox');
            northBox.anchor.setTo(0.5,0.5);
            southBox = mailBoxes.create(400, 500, 'greenBox');
            southBox.anchor.setTo(0.5,0.5);
            westBox = mailBoxes.create(100, 300, 'yellowBox');
            westBox.anchor.setTo(0.5,0.5);
            eastBox = mailBoxes.create(700, 300, 'blueBox');
            eastBox.anchor.setTo(0.5,0.5);
            time = 0
            health = 3
            /*
            northBox = game.add.sprite(400, 100, 'redBox');
            northBox.anchor.setTo(0.5,0.5);
            southBox = game.add.sprite(400, 500, 'greenBox');
            southBox.anchor.setTo(0.5,0.5);
            westBox = game.add.sprite(100, 300, 'yellowBox');
            westBox.anchor.setTo(0.5,0.5);
            eastBox = game.add.sprite(700, 300, 'blueBox');
            eastBox.anchor.setTo(0.5,0.5);
            */


            newMail()
            /*
            game.physics.arcade.enable(northBox)
            game.physics.arcade.enable(southBox)
            game.physics.arcade.enable(eastBox)
            game.physics.arcade.enable(westBox)
            */
            //mail2 = game.add.sprite(400,300,'mail');
           //mail2.anchor.setTo(0.5,0.5);

            score = 0
    
            
            //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            text = game.add.text( 25, 30, "Current Score: " + score, { fontSize: '16px', fill: '#9999ff' } );
            textTwo = game.add.text( 25, 10, "Time Elapsed: " + time, { fontSize: '16px', fill: '#9999ff' } );
            text.anchor.setTo( 0.0, 0.0 );
            textTwo.anchor.setTo( 0.0, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
            //bouncy.inputEnabled = true;
            //bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    /*
        
*/
        update: function () {
            //text.setText("Current Score: " + score);
            text.setText("Remaining health: " + health);
            textTwo.setText("Time Elapsed: " + time);
            //text.setText(direction);
            /*
            game.physics.arcade.overlap(mails, northBox, scoreNorth, null, this)
            game.physics.arcade.overlap(mails, southBox, scoreSouth, null, this)
            game.physics.arcade.overlap(mails, eastBox, scoreEast, null, this)
            game.physics.arcade.overlap(mails, westBox, scoreWest, null, this)
            */
            game.physics.arcade.overlap(mail, mailBoxes, scoreKeep, null, this)

            if(health <= 0){
                alert("You returned " + score + " mails in " + time + " seconds!")
                music.stop()
                game.state.start('Ending')
            }

            if(control.up.isUp && control.down.isUp && control.left.isUp && control.right.isUp){
                reset = true
            }if(mail.body.velocity.x == 0 && mail.body.velocity.y == 0 && reset == true){
                if(direction == 0){
                    if(control.up.isDown){
                        game.physics.arcade.moveToObject(mail,northBox,600)
                        reset = false;
                    }else if(control.down.isDown || control.left.isDown || control.right.isDown){
                        health -= 1
                        reset = false;
                    }
                }else if(direction == 1){
                     if(control.right.isDown){
                        game.physics.arcade.moveToObject(mail,eastBox,600)
                        reset = false;
                    }else if(control.up.isDown ||control.down.isDown || control.left.isDown){
                        health -= 1
                        reset = false;
                    }
                }else if(direction == 2){ 
                    if(control.down.isDown){
                        game.physics.arcade.moveToObject(mail,southBox,600)
                        reset = false;
                    }else if(control.up.isDown || control.left.isDown || control.right.isDown){
                        health -= 1
                        reset = false;
                    }
                }else if(direction == 3){
                     if(control.left.isDown){
                        game.physics.arcade.moveToObject(mail,westBox,600)
                        reset = false;
                    }else if(control.up.isDown ||control.down.isDown || control.right.isDown){
                        health -= 1
                        reset = false;
                    }
                }
            }
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        }


        
    };
    function newMail(){
    
        direction = game.rnd.integerInRange(0, 3)
        if(direction == 0){
            mail = game.add.sprite(400,300,'redMail')
        }else if(direction == 1){
            mail = game.add.sprite(400,300,'blueMail')
        }else if(direction == 2){
            mail = game.add.sprite(400,300,'greenMail')
        }else{
            mail = game.add.sprite(400,300,'yellowMail')
        }
        mail.anchor.setTo(0.5,0.5);
        mail.scale.setTo(0.5,0.5);
        game.physics.arcade.enable(mail);
    }
    function scoreKeep( mail, mailBoxes){
        score += 1
        mail.kill()
        newMail();
    }
    function updateCounter(){
        time += .1
    }
};


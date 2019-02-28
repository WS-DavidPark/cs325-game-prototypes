"use strict";

    let score

    var timeKeeper
    var scoreOneKeeper
    var scoreTwoKeeper
    var healthKeeper
    var healthKeeperTwo

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

    var northBoxT
    var southBoxT
    var eastBoxT
    var westBoxT

    var mail

    var counter
    var counterTwo

    var mailTwo

    let wUp
    let sDown
    let aLeft
    let dRight

    var time = 0
    var health = 3
    var healthTwo = 3
    var scoreTwo = 0

    var lastScored = 0

    var multiplier = 1
    var mulText
    var controlText
    var instructions

    var maxScore = 25

    var reset = true;
    var oneReset = true;
    var twoReset = true;
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

/*
            northBoxT = mailBoxes.create(400,100,'redBox');
            northBoxT.anchor.setTo(0.5,0.5);
            southBoxT = mailBoxes.create(400, 500, 'greenBox');
            southBoxT.anchor.setTo(0.5,0.5);
            westBoxT = mailBoxes.create(100, 300, 'yellowBox');
            westBoxT.anchor.setTo(0.5,0.5);
            eastBoxT = mailBoxes.create(700, 300, 'blueBox');
            eastBoxT.anchor.setTo(0.5,0.5);

*/

            time = 0
            health = 5
            healthTwo = 5
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
            scoreTwo = 0
            
            wUp = game.input.keyboard.addKey(Phaser.Keyboard.W)
            sDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
            aLeft =game.input.keyboard.addKey(Phaser.Keyboard.A)
            dRight = game.input.keyboard.addKey(Phaser.Keyboard.D)
            
            //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            scoreOneKeeper = game.add.text( 25, 30, "Player One Score: " + score, { fontSize: '16px', fill: '#9999ff' } );
            scoreTwoKeeper = game.add.text( 600, 30, "Player Two Score: " + scoreTwo, { fontSize: '16px', fill: '#9999ff' } );
            healthKeeper = game.add.text( 25, 50, "Player One Health: " + health, { fontSize: '16px', fill: '#9999ff' } );
            healthKeeperTwo = game.add.text( 600, 50, "Player Two Health: " + healthTwo, { fontSize: '16px', fill: '#9999ff' } );
            timeKeeper = game.add.text( 25, 10, "Time Elapsed: " + time, { fontSize: '16px', fill: '#9999ff' } );
            mulText = game.add.text( 450, 290, "Multiplier: X" + multiplier, { fontSize: '16px', fill: '#9999ff' } );
            instructions = game.add.text( 25, 500, "Beat the other player in sending the mail to the correct mailbox. \nReach 25 points first without losing health to win", { fontSize: '16px', fill: '#9999ff' } );
            controlText = game.add.text( 25, 570, "CONTROLS:  Player One: Arrow Keys.        Player Two: WASD", { fontSize: '16px', fill: '#9999ff' } );
            
            timeKeeper.anchor.setTo( 0.0, 0.0 );
            scoreOneKeeper.anchor.setTo( 0.0, 0.0 );
            scoreTwoKeeper.anchor.setTo(0.0,0.0);
            healthKeeper.anchor.setTo(0.0,0.0);
            healthKeeperTwo.anchor.setTo(0.0,0.0);
            
            // When you click on the sprite, you go back to the MainMenu.
            //bouncy.inputEnabled = true;
            //bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    /*
        
*/
        update: function () {
            //text.setText("Current Score: " + score);
            scoreOneKeeper.setText("Player One Score: " + score);
            scoreTwoKeeper.setText("Player Two Score: " + scoreTwo);
            timeKeeper.setText("Time Elapsed: " + time);
            healthKeeper.setText("Player One Health: " + health);
            healthKeeperTwo.setText("Player One Health: " + healthTwo);
            mulText.setText("Multiplier: X" + multiplier)

            //text.setText(direction);
            /*
            game.physics.arcade.overlap(mails, northBox, scoreNorth, null, this)
            game.physics.arcade.overlap(mails, southBox, scoreSouth, null, this)
            game.physics.arcade.overlap(mails, eastBox, scoreEast, null, this)
            game.physics.arcade.overlap(mails, westBox, scoreWest, null, this)
            */
            game.physics.arcade.overlap(mail, mailBoxes, scoreKeep, null, this)

            if(health <= 0){
                alert("Player One loses all health points and lost. \nPlayer One scored " + score + " points and player two scored " + scoreTwo + " points")
                music.stop()
                game.state.start('Ending')
            }if(health <= 0){
                alert("Player Two loses all health points and lost. \nPlayer One scored " + score + " points and player two scored " + scoreTwo + " points")
                music.stop()
                game.state.start('Ending')
            }if(score >= 25){
                alert("Player One got to the score goal with " + score + " points and player two scored " + scoreTwo + "points")
                music.stop()
                game.state.start('Ending')
            }if(scoreTwo >= 25){
                alert("Player Two got to the score goal with " + scoreTwo + " points and player one scored " + score + "points")
                music.stop()
                game.state.start('Ending')
            }

            if(control.up.isUp && control.down.isUp && control.left.isUp && control.right.isUp){
                oneReset = true
            }else{
                oneReset = false;
            }

            if(wUp.isUp && sDown.isUp && aLeft.isUp && dRight.isUp){
                twoReset = true
            }else{
                twoReset = false;
            }


            if(oneReset == true && twoReset == true){
                reset = true
            }
            
            if(mail.body.velocity.x == 0 && mail.body.velocity.y == 0 && reset == true){
                if(direction == 0){
                    if(control.up.isDown || control.down.isDown || control.left.isDown || control.right.isDown){
                        if(control.up.isDown){
                            oneReset = false;
                            game.physics.arcade.moveToObject(mail,northBox,600)
                            reset = false;
                            lastScored = 1
                        }else if(control.down.isDown || control.left.isDown || control.right.isDown){
                            health -= 1
                            oneReset = false;
                            reset = false;
                        }
                    }else if(wUp.isDown || sDown.isDown || aLeft.isDown || dRight.isDown){
                        if(wUp.isDown){
                            twoReset = false;
                            game.physics.arcade.moveToObject(mail,northBox,600)
                            reset = false;
                            lastScored = 2
                        }else if(sDown.isDown || aLeft.isDown || dRight.isDown){
                            healthTwo -= 1
                            twoReset = false;
                            reset = false;
                        }
                    }
                }
                
                else if(direction == 1){
                    if(control.up.isDown || control.down.isDown || control.left.isDown || control.right.isDown){
                        if(control.right.isDown){
                            oneReset = false;
                            game.physics.arcade.moveToObject(mail,eastBox,600)
                            reset = false;
                            lastScored = 1
                        }else if(control.down.isDown || control.left.isDown || control.up.isDown){
                            health -= 1
                            oneReset = false;
                            reset = false;
                        }
                    }else if(wUp.isDown || sDown.isDown || aLeft.isDown || dRight.isDown){
                        if(dRight.isDown){
                            twoReset = false;
                            game.physics.arcade.moveToObject(mail,eastBox,600)
                            reset = false;
                            lastScored = 2
                        }else if(sDown.isDown || aLeft.isDown || wUp.isDown){
                            healthTwo -= 1
                            twoReset = false;
                            reset = false;
                        }
                    }
                }

                else if(direction == 2){    
                    if(control.up.isDown || control.down.isDown || control.left.isDown || control.right.isDown){
                        if(control.down.isDown){
                            oneReset = false;
                            game.physics.arcade.moveToObject(mail,southBox,600)
                            lastScored = 1
                            reset = false;
                        }else if(control.up.isDown || control.left.isDown || control.right.isDown){
                            health -= 1
                            oneReset = false;
                            reset = false;
                        }
                    }else if(wUp.isDown || sDown.isDown || aLeft.isDown || dRight.isDown){
                            if(sDown.isDown){
                                twoReset = false;
                                game.physics.arcade.moveToObject(mail,southBox,600)
                            lastScored = 2
                                reset = false;
                            }else if(dRight.isDown || aLeft.isDown || wUp.isDown){
                                healthTwo -= 1
                                twoReset = false;
                                reset = false;
                            }
                        }
                    
                }else if(direction == 3){
                    if(control.up.isDown || control.down.isDown || control.left.isDown || control.right.isDown){
                        if(control.left.isDown){
                            oneReset = false;
                            game.physics.arcade.moveToObject(mail,westBox,600)
                            lastScored = 1
                            reset = false;
                        }else if(control.up.isDown ||control.down.isDown || control.right.isDown){
                            health -= 1
                            oneReset = false;
                            reset = false;
                        }
                    }else if(wUp.isDown || sDown.isDown || aLeft.isDown || dRight.isDown){
                        if(aLeft.isDown){
                            twoReset = false;
                            game.physics.arcade.moveToObject(mail,westBox,600)
                            lastScored = 2
                            reset = false;
                        }else if(dRight.isDown || sDown.isDown || wUp.isDown){
                            healthTwo -= 1
                            twoReset = false;
                            reset = false;
                        }
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
        if(lastScored == 1){
            score += 1*multiplier
        }else if(lastScored == 2){
            scoreTwo += 1*multiplier
        }
        mail.kill()
        newMail();
        multiplier = game.rnd.integerInRange(1, 4)
    }

    function updateCounter(){
        time += .1
    }
};


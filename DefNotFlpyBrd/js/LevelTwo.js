"use strict";

GameStates.makeGame = function( game, shared ) {
    let score = 0
    var timeKeeper
    var scoreKeeper
    var music
    // Create your own variables.
    var bird
    var ground
    var pipe
    var pipeBot
    var leftCheck
    var rightCheck
    var leftVelo = -200
    var spaceUpped = false
    var wall
    var dir = "left"
    var dirArrow

    var pipeTop1
    var pipeBot1
    var pipeTop2
    var pipeBot2
    var pipeTop3
    var pipeBot3
    var pipeTop4
    var pipeBot4
    var pipeTop5
    var pipeBot5
    var pipeTop6
    var pipeBot6
    var pipeTop7
    var pipeBot7

    var lastOffset = 0
    var currOffSet = 0
    var lastOffset2 = 10
    var currOffSet2 = -10
    var pipeSpacing = 295

    var topUpdated = false
    var botUpdated = false

    var control = null;
    var spaceKey


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
        game.state.start('LevelOneLoad');

    }
    
    return {
    
        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE)

            dirArrow = game.add.sprite(600, 150, 'arrow')

            ground = game.add.sprite(0, game.world.height-100 ,'flapGround')
            game.physics.arcade.enable(ground)
            ground.body.immovable = true

            leftCheck = game.add.sprite(-100,400,'pipe')
            game.physics.arcade.enable(leftCheck)
            leftCheck.anchor.setTo(0.5,0.5)
            leftCheck.body.immovable = true

            rightCheck = game.add.sprite(1300,400,'pipe')
            game.physics.arcade.enable(rightCheck)
            rightCheck.anchor.setTo(0.5,0.5)
            rightCheck.body.immovable = true

            bird = game.add.sprite(game.world.centerX, game.world.centerY, 'bird' )
            game.physics.arcade.enable(bird)
            bird.scale.x = .15
            bird.scale.y = .15
            bird.anchor.setTo(0.5,0.5)
            bird.body.gravity.y = 1450
            bird.body.bounce.y = .2
            bird.body.bounce.x - .1
            bird.body.collideWorldBounds = true;
            bird.maxVelocity = new Phaser.Point(-100, 100)

            pipe = game.add.group()
            pipe.enableBody = true
            pipeBot = game.add.group()
            pipeBot.enableBody = true

            currOffSet = game.rnd.integerInRange(-20, 35)
            pipeTop1 = pipe.create(200,400-pipeSpacing+currOffSet,'pipe')
            pipeTop1.body.immovable = true
            pipeTop1.anchor.setTo(0.5,0.5)
            pipeTop1.scale.x = .5
            pipeTop1.scale.y = .5
            pipeBot1 = pipeBot.create(200,400+pipeSpacing+currOffSet,'pipe')
            pipeBot1.body.immovable = true
            pipeBot1.anchor.setTo(0.5,0.5)
            pipeBot1.scale.x = .5
            pipeBot1.scale.y = -.5
            pipeTop1.body.velocity.x = leftVelo
            pipeBot1.body.velocity.x = leftVelo

            currOffSet = game.rnd.integerInRange(-20, 35)
            pipeTop2 = pipe.create(500,400-pipeSpacing+currOffSet,'pipe')
            pipeTop2.body.immovable = true
            pipeTop2.anchor.setTo(0.5,0.5)
            pipeTop2.scale.x = .5
            pipeTop2.scale.y = .5
            pipeBot2 = pipeBot.create(500,400+pipeSpacing+currOffSet,'pipe')
            pipeBot2.body.immovable = true
            pipeBot2.anchor.setTo(0.5,0.5)
            pipeBot2.scale.x = .5
            pipeBot2.scale.y = -.5
            pipeTop2.body.velocity.x = leftVelo
            pipeBot2.body.velocity.x = leftVelo

            pipeTop3 = pipe.create(800,105,'pipe')
            pipeTop3.body.immovable = true
            pipeTop3.anchor.setTo(0.5,0.5)
            pipeTop3.scale.x = .5
            pipeTop3.scale.y = .5
            pipeBot3 = pipeBot.create(800,695,'pipe')
            pipeBot3.body.immovable = true
            pipeBot3.anchor.setTo(0.5,0.5)
            pipeBot3.scale.x = .5
            pipeBot3.scale.y = -.5
            pipeTop3.body.velocity.x = leftVelo
            pipeBot3.body.velocity.x = leftVelo

            currOffSet = game.rnd.integerInRange(-20, 35)
            if(currOffSet >= 0){
                lastOffset = game.rnd.integerInRange(-50, 0)
            }else{
                lastOffset = game.rnd.integerInRange(0, 50)
            }
            pipeTop4 = pipe.create(1100,400-pipeSpacing+currOffSet,'pipe')
            pipeTop4.body.immovable = true
            pipeTop4.anchor.setTo(0.5,0.5)
            pipeTop4.scale.x = .5
            pipeTop4.scale.y = .5
            pipeBot4 = pipeBot.create(1100,400+pipeSpacing+currOffSet,'pipe')
            pipeBot4.body.immovable = true
            pipeBot4.anchor.setTo(0.5,0.5)
            pipeBot4.scale.x = .5
            pipeBot4.scale.y = -.5
            pipeTop4.body.velocity.x = leftVelo
            pipeBot4.body.velocity.x = leftVelo
            pipeTop4.body.velocity.y = lastOffset
            pipeBot4.body.velocity.y = lastOffset

            currOffSet = game.rnd.integerInRange(-20, 35)
            if(currOffSet >= 0){
                lastOffset = game.rnd.integerInRange(-50, 0)
            }else{
                lastOffset = game.rnd.integerInRange(0, 50)
            }
            pipeTop5 = pipe.create(1400,400-pipeSpacing+currOffSet,'pipe')
            pipeTop5.body.immovable = true
            pipeTop5.anchor.setTo(0.5,0.5)
            pipeTop5.scale.x = .5
            pipeTop5.scale.y = .5
            pipeBot5 = pipeBot.create(1400,400+pipeSpacing+currOffSet,'pipe')
            pipeBot5.body.immovable = true
            pipeBot5.anchor.setTo(0.5,0.5)
            pipeBot5.scale.x = .5
            pipeBot5.scale.y = -.5
            pipeTop5.body.velocity.x = leftVelo
            pipeBot5.body.velocity.x = leftVelo
            pipeTop5.body.velocity.y = lastOffset
            pipeBot5.body.velocity.y = lastOffset

            music = game.add.audio('gameMusic')
            music.play()

            var timer = game.time.create(false);
            timer.loop(100, updateCounter, this);
            timer.start();

            control = game.input.keyboard.createCursorKeys();
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            time = 0

            score = 0
            scoreTwo = 0
            
            wUp = game.input.keyboard.addKey(Phaser.Keyboard.W)
            sDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
            aLeft =game.input.keyboard.addKey(Phaser.Keyboard.A)
            dRight = game.input.keyboard.addKey(Phaser.Keyboard.D)
            
            //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            //scoreKeeper = game.add.text( game.world.centerX, 30, "Player Score: " + score, { fontSize: '16px', fill: '#ffffff' } );
            timeKeeper = game.add.text( 25, 10, "Time Elapsed: " + time, { fontSize: '16px', fill: '#9999ff' } );
            //mulText = game.add.text( 450, 290, "Multiplier: X" + multiplier, { fontSize: '16px', fill: '#9999ff' } );
            instructions = game.add.text( 25, 500, "Beat the other player in sending the mail to the correct mailbox. \nReach 25 points first without losing health to win", { fontSize: '16px', fill: '#9999ff' } );
            //controlText = game.add.text( 25, 570, "CONTROLS:  Player Two: WASD        Player One: Arrow Keys.", { fontSize: '16px', fill: '#9999ff' } );
            
            timeKeeper.anchor.setTo( 0.0, 0.0 );
            //scoreKeeper.anchor.setTo( 0.0, 0.0 );
            
        },
        update: function () {
            shared.sharedScore = time
            game.physics.arcade.collide(leftCheck, pipe, killPipe, null, this)
            game.physics.arcade.collide(leftCheck, pipeBot, killPipeBot, null, this)
            game.physics.arcade.collide(pipeBot, bird, endLevelBot, null, this)
            game.physics.arcade.collide(pipe, bird, endLevel, null, this)
            ground.bringToTop()
            game.physics.arcade.collide(bird,ground)
            game.physics.arcade.collide(bird,pipe)

            if(topUpdated == true && botUpdated == true){
                newPipe()
            }
            //scoreKeeper.setText("Player Two Score: " + score);
            timeKeeper.setText("Time Elapsed: " + time);

            if(time >= 60){
                game.state.start('Ending')
            }

            if(spaceKey.isUp){
                spaceUpped = true
            }
            if(spaceUpped == true && spaceKey.isDown){
                bird.body.velocity.y -=500
                spaceUpped = false
            }
        }    
    }

    function newPipe(){
        currOffSet2 = game.rnd.integerInRange(-20, 35)
        if(currOffSet2 >= 0){
            lastOffset2 = game.rnd.integerInRange(-50, 0)
        }else{
            lastOffset2 = game.rnd.integerInRange(0, 50)
        }
    }

    function killPipeBot(leftCheck, pipeBot){
        pipeBot.x =+ 1500
        pipeBot.y = 400+pipeSpacing+currOffSet2
        pipeBot.body.velocity.x = leftVelo
        pipeBot.body.velocity.y = lastOffset2
        botUpdated = true
    }

    function killPipe(leftCheck, pipe){
        pipe.x =+ 1500
        pipe.y = 400-pipeSpacing+currOffSet2
        pipe.body.velocity.x = leftVelo
        pipe.body.velocity.y = lastOffset2
        topUpdated = true
    }

    function scoreKeep( wall, pipe){
        score++
    }

    function endLevelBot(pipeBot, bird){
        bird.kill()
        game.state.start('LevelOneEnding')
    }
    function endLevel(pipe, bird){
        bird.kill()
        game.state.start('LevelOneEnding')

    }

    function updateCounter(){
        time += .1
    }
};


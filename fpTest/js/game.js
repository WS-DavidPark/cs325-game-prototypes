// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(1000, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let pOne
let pOneHp = 100
let pOneAttacking
let pOneHpDisplay
let pOneDirection

let pTwo
let pTwoHp = 100
let pTwoAttacking
let pTwoHpDisplay 
let pTwoDirection

let platforms


let controlOne
let oneAttack
let controlTwo
let twoAttack

let announcement
let deathState

let wUp
let sDown
let aLeft
let dRight

let hit
let music

function preload () {
  // Load & Define our game assets
  game.load.image('background', 'assets/background.png')
  //load playerSprite 1
  game.load.spritesheet('playerOne','./assets/adventurer-Sheet.png',50,37)
  game.load.spritesheet('playerTwo','./assets/adventurer2.png',50,37)
  game.load.image('platform','ground.png')
  game.load.audio('hit', './assets/7.ogg')
  game.load.audio('music','./assets/BipolarNightmare.mp3')
  //load playerSprite 2
  //load platformSprite
  //load music
  //load jump sound
  //load attack sound

}

function create () {
 music = game.add.audio('music')
 music.play()
  game.physics.startSystem(Phaser.Physics.ARCADE)
  //sounds = game.add.audio('music');
  //sounds.play();
  //jump = game.add.audio('jump');
  //attack = game.add.audio('attack');

  game.add.sprite(0, 0, 'background')

    //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group()

    //  We will enable physics for any object that is created in this group
  platforms.enableBody = true

    // Here we create the ground.
  let ground = platforms.create(0, game.world.height - 25, 'platform')

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(35, 1)

    //  This stops it from falling away when you jump on it
  ground.body.immovable = true

    //  Now let's create two ledges
  let ledge = platforms.create(400, 350, 'platform')
  ledge.body.immovable = true
  let ledge3 = platforms.create(300, 350, 'platform')
  ledge3.body.immovable = true
  let ledge4 = platforms.create(500, 350, 'platform')
  ledge4.body.immovable = true
  let ledge5 = platforms.create(600, 350, 'platform')
  ledge5.body.immovable = true

  let ledge2 = platforms.create(100, 200, 'platform')
  ledge2.body.immovable = true
  let ledge6 = platforms.create(200, 200, 'platform')
  ledge6.body.immovable = true

  let ledge7 = platforms.create(700, 200, 'platform')
  ledge7.body.immovable = true
  let ledge8 = platforms.create(800, 200, 'platform')
  ledge8.body.immovable = true

 hit = game.add.audio('hit')
    // The player and its settings
  pOne = game.add.sprite(32, game.world.height - 150, 'playerOne')
  //pTwo = game.add.sprite(200, game.world.height - 150, 'playerOne')
    //  We need to enable physics on the player
  game.physics.arcade.enable(pOne)
  pOneHp = 100
  //pOneDirection = true
  //pOneAttacking = false
  //  Player physics properties. Give the little guy a slight bounce.
  pOne.body.bounce.y = 0.0
  pOne.body.gravity.y = 800
  pOne.body.collideWorldBounds = true
  pOne.animations.add('attack', [48,49,50,51,52], 10, true)
  pOne.animations.add('run', [8,9,10,11,12,13], 10, true)
  pOne.animations.add('jump',[16,17,18,19,20,21],10,true)
  pOne.animations.add('idle', [38,39,40,41], 10, true)
  //pOne.animations.play('idle')

  pTwo = game.add.sprite(600, game.world.height - 150, 'playerTwo')
    //  We need to enable physics on the player
  game.physics.arcade.enable(pTwo)
  pTwoHp = 100
  //  Player physics properties. Give the little guy a slight bounce.
  pTwo.body.bounce.y = 0.0
  pTwo.body.gravity.y = 800
  pTwo.body.collideWorldBounds = true
  pTwo.animations.add('attack', [48,49,50,51,52], 10, true)
  pTwo.animations.add('run', [8,9,10,11,12,13], 10, true)
  pTwo.animations.add('jump',[16,17,18,19,20 ,21],10,true)
  pTwo.animations.add('idle', [38,39,40,41], 10, true)
  //pTwo.animatioms.play('idle2')



    //  Create the score text
  pOneHpDisplay = game.add.text(16, 16, "Player One Health: " + pOneHp, { fontSize: '32px', fill: '#000' })
  pTwoHpDisplay = game.add.text(16, 50, "Player Two Health: " + pTwoHp, { fontSize: '32px', fill: '#000' })
  announcement = game.add.text(300, 300, '', { fontSize: '42px', fill: '#000' } )

    //  And bootstrap our controls
  controlOne = game.input.keyboard.createCursorKeys()
  oneAttack = game.input.keyboard.addKey(Phaser.Keyboard.M)
  wUp = game.input.keyboard.addKey(Phaser.Keyboard.W)
  sDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
  aLeft =game.input.keyboard.addKey(Phaser.Keyboard.A)
  dRight = game.input.keyboard.addKey(Phaser.Keyboard.D)

  twoAttack = game.input.keyboard.addKey(Phaser.Keyboard.Z)
  

}

function update () {
  
    //  We want the player to stop when not moving
  //pOne.body.velocity.x = 0
  pOneHpDisplay.setText("Player One Health: " + pOneHp)
  pTwoHpDisplay.setText("Player Two Health: " + pTwoHp)
    //  Setup collisions for the player, diamonds, and our platforms
  game.physics.arcade.collide(pOne, platforms)
  game.physics.arcade.collide(pTwo, platforms)
  //game.physics.arcade.collide(pOne, pTwo)

    //  Call callectionDiamond() if player overlaps with a diamond
  //game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

    // Configure the controls!
  if(pOneHp <= 0){
    announcement.setText("Player Two Wins!")
    pOne.animations.stop()
    pTwo.animations.stop()
    deathState = true
  }else if(pTwoHp <= 0){
    announcement.setText("Player One Wins!")
    pOne.animations.stop()
    pTwo.animations.stop()
    deathState = true
  }
  
  if(!deathState){
    
    pOne.body.velocity.x = 0
    pTwo.body.velocity.x = 0
    
    //playerOne Controls
    if(controlOne.up.isDown && pOne.body.touching.down){
        pOne.animations.play('jump')
        pOne.anchor.setTo(.5,.5)
        pOne.body.velocity.y = -500
    }else if(!pOne.body.touching.down){
          pOne.animations.play('jump')
        pOne.anchor.setTo(.5,.5)
      if(controlOne.left.isDown){
        pOne.scale.x = -1
        pOne.animations.play('jump')
        pOne.anchor.setTo(.5,.5)
        pOne.body.velocity.x = -100
      }else if(controlOne.right.isDown){
        pOne.scale.x = 1
        pOne.animations.play('jump')
        pOne.anchor.setTo(.5,.5)
        pOne.body.velocity.x = 100
      }
    }else if(controlOne.left.isDown){
        //pOneAttacking = false
        pOne.scale.x = -1
        pOne.anchor.setTo(.5,.5)
        pOne.animations.play('run')
        pOne.body.velocity.x = -150
    }else if(controlOne.right.isDown){
        //pOneAttacking = false
        pOne.scale.x = 1
        pOne.anchor.setTo(.5,.5)
        pOne.animations.play('run')
        pOne.body.velocity.x = 150
    }else if(oneAttack.isDown ){
      if(!pOneAttacking){
        pOneAttacking = true
        pOne.animations.play('attack')
        hit.play()
        game.physics.arcade.overlap(pOne,pTwo,healthCheck, null, this)
        pOne.anchor.setTo(.5,.5)
      }
    }
    else{
      pOne.animations.play('idle')
    }if(oneAttack.isUp){
      pOneAttacking = false
    }


    if(wUp.isDown && pTwo.body.touching.down){
        pTwo.animations.play('jump')
        pTwo.anchor.setTo(.5,.5)
        pTwo.body.velocity.y = -500
    }else if(!pTwo.body.touching.down){
          pTwo.animations.play('jump')
        pTwo.anchor.setTo(.5,.5)
      if(aLeft.isDown){
        pTwo.scale.x = -1
        pTwo.animations.play('jump')
        pTwo.anchor.setTo(.5,.5)
        pTwo.body.velocity.x = -100
      }else if(dRight.isDown){
        pTwo.scale.x = 1
        pTwo.animations.play('jump')
        pTwo.anchor.setTo(.5,.5)
        pTwo.body.velocity.x = 100
      }
    }else if(aLeft.isDown){
        //pOneAttacking = false
        pTwo.scale.x = -1
        pTwo.anchor.setTo(.5,.5)
        pTwo.animations.play('run')
        pTwo.body.velocity.x = -150
    }else if(dRight.isDown){
        //pOneAttacking = false
        pTwo.scale.x = 1
        pTwo.anchor.setTo(.5,.5)
        pTwo.animations.play('run')
        pTwo.body.velocity.x = 150
    }else if(twoAttack.isDown ){
      if(!pTwoAttacking){
        pTwoAttacking = true
        pTwo.animations.play('attack')
        hit.play()
        game.physics.arcade.overlap(pOne,pTwo,healthCheck, null, this)
        pTwo.anchor.setTo(.5,.5)
      }
    }
    else{
      pTwo.animations.play('idle')
    }if(twoAttack.isUp){
      pTwoAttacking = false
    }
    

 
  }

    //  This allows the player to jump!
    // Show an alert modal when score reaches 120
    
}
function healthCheck(pOne, pTwo){
if(pOneAttacking){
      pTwoHp -=5
    }
if(pTwoAttacking){
      pOneHp -=5
    }
}


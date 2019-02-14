// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(1000, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let pOne
let pOneHp
let pOneAttacking
let pOneHpDisplay
let pOneDirection

let pTwo
let pTwoHp = 100
let pTwoAttacking = false
let pTwoHpDisplay = ""
let pTwoDirection = ""

let platforms


let controlOne
let oneAttack
let controlTwo
let twoAttack

let announcement
let deathState



function preload () {
  // Load & Define our game assets
  game.load.image('background', 'assets/background.png')
  //load playerSprite 1
  game.load.image('playerOne', 'assets/adventurer-Sheet.png')
  //load playerSprite 2
  //load platformSprite
  //load music
  //load jump sound
  //load attack sound

}

function create () {
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
  let ground = platforms.create(0, game.world.height - 64, 'ground')

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2)

    //  This stops it from falling away when you jump on it
  ground.body.immovable = true

    //  Now let's create two ledges
  let ledge = platforms.create(400, 450, 'ground')
  ledge.body.immovable = true



    // The player and its settings
  pOne = game.add.sprite(32, game.world.height - 150, 'playerOne')
  pTwo = game.add.sprite(200, game.world.height - 150, 'playerOne')
    //  We need to enable physics on the player
  game.physics.arcade.enable(pOne)
  pOneHp = 100
  pOneDirection = true
  pOneAttacking = false
  //  Player physics properties. Give the little guy a slight bounce.
  pOne.body.bounce.y = 0.0
  pOne.body.gravity.y = 1000
  pOne.body.collideWorldBounds = true
  pOne.animations.add('attack', [48,49,50,51,52], 10, true)
  pOne.animations.add('run', [8, 9, 10, 11,12,13], 10, true)
  pOne.animations.add('jump',[16,17,18,19,20,21],10,true)
  pOne.animations.add('idle', [38 ,39, 40, 41], 10, true)


  pTwo = game.add.sprite(32, game.world.height - 150, 'playerOne')
    //  We need to enable physics on the player
  game.physics.arcade.enable(pTwo)
  pTwoHp = 100
  pTwoDirection = true
  pTwoAttacking = false
  //  Player physics properties. Give the little guy a slight bounce.
  pTwo.body.bounce.y = 0.0
  pTwo.body.gravity.y = 1000
  pTwo.body.collideWorldBounds = true
  pTwo.animations.add('attack', [48,49,50,51,52], 10, true)
  pTwo.animations.add('run', [8, 9, 10, 11,12,13], 10, true)
  pTwo.animations.add('jump',[16,17,18,19,20,21],10,true)
  pTwo.animations.add('idle', [38 ,39, 40, 41], 10, true)



    //  Create the score text
  pOneHpDisplay = game.add.text(16, 16, "Player One Health: " + pOneHp, { fontSize: '32px', fill: '#000' })
  pTwoHpDisplay = game.add.text(16, 50, "Player Two Health: " + pTwoHp, { fontSize: '32px', fill: '#000' })
  announcement = game.add.text(300, 300, '', { fontSize: '42px', fill: '#000' } )

    //  And bootstrap our controls
  controlOne = game.input.keyboard.createCursorKeys()
  oneAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  controTwo = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
  }
  twoAttack = game.input.keyboard.addKey(Phaser.Keyboard.Z)

}

function update () {
    //  We want the player to stop when not moving
  //pOne.body.velocity.x = 0
  pOneHpDisplay.setText("Player One Health: " + pOneHp)
  pTwoHpDisplay.setText("Player One Health: " + pTwoHp)
    //  Setup collisions for the player, diamonds, and our platforms
  game.physics.arcade.collide(pOne, platforms)
  game.physics.arcade.collide(pTwo, platforms)
  game.physics.arcade.collide(pOne, pTwo)

    //  Call callectionDiamond() if player overlaps with a diamond
  //game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

    // Configure the controls!
  if(pOneHp <= 0){
    announcement.setText("Player One Wins!")
    pOne.animations.stop()
    pTwo.animations.stop()
    deathState = true
  }else if(pTwoHp <= 0){
    announcement.setText("Player Two Wins!")
    pTwo.animations.stop()
    deathState = true
  }
  
  if(!deathState){
    //playerOne Controls
    if(controlOne.left.isDown){
        pOneAttacking = false
        pOne.scale.x = -1
        pOne.animations.play('right')
        pOne.body.velocity.x = -150
    }else if(controlOne.right.isDown){
        pOneAttacking = false
        pOne.scale.x = 1
        pOne.animations.play('right')
        pOne.body.velocity.x = 150
    }
    if(controlOne.up.isDown && player.body.touching.down){
        pOneAttacking = false
        pOne.animations.play('jump')
        pOne.body.velocity.y = -400
    }
    if(!pOneAttacking && oneAttack.isDown){
        pOneAttacking = true
        pOne.animations.play('attack')
    }if(controlOne.left.isDown || controlOne.left.isDown || controlOne.left.isDown || !pOneAttacking){
        pOne.animations.play('idle')
    }
 
  }

    //  This allows the player to jump!
    // Show an alert modal when score reaches 120
}



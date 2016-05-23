//igual a descricao do main.js
var SideScroller = SideScroller || {};
 
SideScroller.Preload = function(){};
 
SideScroller.Preload.prototype = {
 
  preload: function() {
 
    //Mostro a barra de loading enquanto carrego os recursos
	//Adiciono como sprite centralizando ela na vert. e hori. e será o preloadbar
	//previamente carregada no Boot.js
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    
	//Ajusto a anchor dela para depois que aumentar o tamanho ou rotacionar ela não sair da posição
	this.preloadBar.anchor.setTo(0.5);
	
	//Aumento o tamanho da barra em 3x.
    this.preloadBar.scale.setTo(3);
	
	//A função a seguir já ajusta o tamanho da imagem de acordo com o carregamento do game.
    this.load.setPreloadSprite(this.preloadBar);
 
    //Carregando os recursos
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
 
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('playerDuck', 'assets/images/player_duck.png');
    this.load.image('playerDead', 'assets/images/player_dead.png');
    this.load.image('goldCoin', 'assets/images/goldCoin.png');
	
    this.load.audio('coin', 'assets/audio/coin.wav');
 
  },
 
  create: function() {
	//Inicio o próximo state
    this.state.start('Game');
 
  }
 
};
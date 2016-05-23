//igual a descricao do main.js
var SideScroller = SideScroller || {};
 
SideScroller.Boot = function(){};
 
//Ajusto as configurações do game e carrego os recursos da tela de loading.
SideScroller.Boot.prototype = {
 
  preload: function() {
 
    //recursos que serão usados na tela de loading, carregando na memória pra agilizar o resto
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
 
  },
 
  create: function() {
 
    //A tela de loading terá um fundo branco
    this.game.stage.backgroundColor = '#fff';
 
    /*
	Opções de scaling (tamanho) da tela, há 3 opções:
		EXACT_FIT: Estica o game para cobrir toda a área
		SHOW_ALL: Aumenta o jogo mantendo a proporcionalidade
		NO_SCALE: Sem ajustes
	*/
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
    //Centralizando o game na horizontal e vertical
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
 
    //Tamanho da tela ajustado automaticamente
    //this.scale.setScreenSize(true);
 
    //Sistema de physics do game que será arcade
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//iniciamos o preload
    this.state.start('Preload');
 
  }
 
};
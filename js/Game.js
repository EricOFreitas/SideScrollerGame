//igual a descricao do main.js
var SideScroller = SideScroller || {};
 
SideScroller.Game = function(){};
 
SideScroller.Game.prototype = {
 
  preload: function() {
		//inicio uma contagem de fps para mostrar na tela
		this.game.time.advancedTiming = true;
 
    },
 
  create: function() {
	  
	  //iniciando os controles do jogo
		this.initGameController();
	  
		this.map = this.game.add.tilemap('level1');
 
		//O primeiro parâmetro é o nome como do arquivo png e o segundo é o nome chave pra acessar o recurso
		this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
 
		//Criando as camadas
		this.backgroundlayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
 
		//som
		this.coinSound = this.game.add.audio('coin');
 
		//Colisão na blockedLayer
		//Aqui na colisão eu digo que ela será entre os elemebntos 1 e 100mil pois cada elemento cada um id único, como não tenho tantos, tudo será usado pra colisão
		this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
 
		//Redimensionando o canvas do jogo para igualar aos tamanhos da layer
		this.backgroundlayer.resizeWorld();
		
		//chamo o método para criar as moedas
		this.createCoins();
	
		//Crio o jogador que já foi pré carregado no Preload
		this.player = this.game.add.sprite(100, 200, 'player');
		
		//Habilito física no player para poder usar gravidade e controles.		 
		this.game.physics.arcade.enable(this.player);
		 
		//Definir gravidade para o player cair
		this.player.body.gravity.y = 1000;
		 
		//A câmera irá seguir o player pela tela
		this.game.camera.follow(this.player);
		
		//habilito a entrada pelo teclado das setas
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		
		//Propriedades pra quando o personagem está abaixaxo e de pé
		var playerDuckImg = this.game.cache.getImage('playerDuck');
		
		//pego o tamanho da imagem abaixado
		this.player.duckedDimensions = {width: playerDuckImg.width, height: playerDuckImg.height};
		
		//pego o tamanho da imagem normal, em pé
		this.player.standDimensions = {width: this.player.width, height: this.player.height};
		
		//seto a ancora para não sair de posição quando trocar as imagens
		this.player.anchor.setTo(0.5, 1);
 
	}, 
 
  update: function() {
		//Dentro do update coloco colisão, pois será verificado várias vezes durante o game se houve colide.
		this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
		
		//Com as moedas ele irá passar por cima e não colidir de trombar/bater
		this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);
		
		if(this.player.alive){
			//com isto o player irá se mover nesta velocidade pra direita automáticamente.
			this.player.body.velocity.x = 300; 

			//faço este if para verificar se foi pressionado seta pra cima, caso sim o player irá pular.
			if(this.cursors.up.isDown) {
				this.playerJump();
			}
			else if(this.cursors.down.isDown) {
				this.playerDuck();
			}
	 
			//se o jogador não está abaixado e não está pressionado a seta pra baixo...
			//if(!this.cursors.down.isDown && this.player.isDucked) {
			if(!this.cursors.down.isDown && this.player.isDucked && !this.pressingDown) { //este é para o cel, o de cima para pc

 
				//Muda a imagem e atualiza o tamanho do cortpo para a física do game
				this.player.loadTexture('player');
				this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
				this.player.isDucked = false;
			}		
		
			//faço este if para verificar se foi pressionado seta pra cima, caso sim o player irá pular.
			if(this.cursors.up.isDown) {
				this.playerJump();
			}
		}
		
		//reinicia o jogo se alcançado o canto da tela
 
		if(this.player.x >= this.game.world.width) {
		 
			this.game.state.start('Game');
		 
		}
		
  },

//método que inicia o game controller pra celular.. botoezinhos e talz na tela.  
  initGameController: function() {
	if(!GameController.hasInitiated) {
	  var that = this;     
	  GameController.init({
		  left: {
			  type: 'none',
		  },

		  right: { 
			  type: 'buttons',
			  buttons: [
				false,
				{
				  label: 'J',
				  touchStart: function() {
					if(!that.player.alive) {
					  return;
					}
					that.playerJump();
				  }
				},
 
				false,
				{
				  label: 'D',
				  touchStart: function() {
					if(!that.player.alive) {
					  return;
					}
					that.pressingDown = true; that.playerDuck();
				  },
				  touchEnd: function(){
					that.pressingDown = false;
				  }
				}
			  ]
		  },
	  });
 
	  GameController.hasInitiated = true;
 
	}
 
  },
  
  //método que cria as moedas		 
  createCoins: function() {
 
	this.coins = this.game.add.group();
 
	this.coins.enableBody = true;
 
	var result = this.findObjectsByType('coin', this.map, 'objectsLayer');
 
	result.forEach(function(element){
 
	  this.createFromTiledObject(element, this.coins);
 
	}, this);
 
  },
  
  collect: function(player, collectable) {
 
    //play no som
    this.coinSound.play();
 
    //removo a sprite da moeda da tela
    collectable.destroy();
 
  },
  
  playerDuck: function() {
 
      //mudo a imagem e atualizo o tamanho do corpo para a física do game
      this.player.loadTexture('playerDuck');
      this.player.body.setSize(this.player.duckedDimensions.width, this.player.duckedDimensions.height);
 
      //Isto é para verificar se o jogador está abaixado ou não
      this.player.isDucked = true;
 
  },
  
  //método que faz o player pular.. chamo ela lá no update
  playerJump: function() {
	//verifico se o  player está tocando o chão para poder pular.
    if(this.player.body.blocked.down) {
 
      this.player.body.velocity.y -= 500;
 
    }   
 
  },
  
  //Crio este método porque chamo ali em cima.. se não for usar poderia remover daqui e dos parâmetros deixando lá só os dois primeiros.
  playerHit: function(player, blockedLayer) { 
		//se bater no lado direito, morre, afinal ele só anda pra direita
		if(player.body.blocked.right) {
	 
		  //ajustando a morte (isto não afeta a renderização). Esta propriedade está presente em todos os sprites
		  this.player.alive = false;
	 
		  //paro o movimento pra direita
		  this.player.body.velocity.x = 0;
	 
		  //mudo a imagem do sprite para o bichinho morto
		  this.player.loadTexture('playerDead');
	 
		  //vá para o gameover depois de 1,5s
		  this.game.time.events.add(1500, this.gameOver, this);
	 
		} 
  },
  
  //Encontro objetos em uma camada do tiled que contenha uma propriedade chamada "type" = x valor (irei definir qual x quero)
  findObjectsByType: function(type, map, layerName) {
 
    var result = new Array();
 
    map.objects[layerName].forEach(function(element){
 
      if(element.properties.type === type) {
 
        //Phaser usa o canto esquerdo em cima, Tiled canto esquerdo em baixo, assim teremos um ajuste
        //É bom saber que algumas imagens poderiam ser diferentes nos tamanhos com as do tile
        //então elas não poderão ser trocadas na posição exata como no tile
 
        element.y -= map.tileHeight;
 
        result.push(element);
 
      }     
 
    });
 
    return result;
 
  },
  
  //Criando um sprite de um objeto
  createFromTiledObject: function(element, group) {
 
    var sprite = group.create(element.x, element.y, element.properties.sprite);
 
      //copio todas as propriedades para o objeto
      Object.keys(element.properties).forEach(function(key){
 
        sprite[key] = element.properties[key];
 
      });
 
  },
 
  render: function()
 
    {
		//mostro o fps em um objeto do tipo text
        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");  
 
    }
 
};
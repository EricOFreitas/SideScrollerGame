//verifico se o objeto SideScroller está criado, senão crio ele vazio.
var SideScroller = SideScroller || {};

//Instacio SideScroller passando a área do game e deixando o Phaser escolher entre 
//as tecnologias canvas ou opengl
SideScroller.game =  new Phaser.Game(746, 420, Phaser.AUTO, '');
 
//Digo ao phaser para carregar os states no nosso contexto SideScroller


/*
	Este state é onde irei definir o tamanho da tela e mais algumas configurações
	básicas do game como a physics usada (irei usar arcade). Também carregarei os
	assets que serão mostrados no preload.
	Poderia fazer tudo no preload, mas as vezes pode ser muita coisa, deixo pra ele
	apenas a barra de loading e um logo :)
*/
SideScroller.game.state.add('Boot', SideScroller.Boot);


/*
	Onde todos os recursos serão carregados (imagens, audio, sprites, etc).
	Quando carrego aqui eles vão pra memória ram e deixa mais rápido, senão quando 
	der um tiro até aparecer a imagem já terá acertado o inimigo =)
*/
SideScroller.game.state.add('Preload', SideScroller.Preload);

/*
	Este state é onde será o jogo em si.
*/
SideScroller.game.state.add('Game', SideScroller.Game);


SideScroller.game.state.start('Boot');
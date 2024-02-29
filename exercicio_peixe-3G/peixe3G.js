var larguraJogo = 750;
var alturaJogo = 600;

const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 30 },
            debug: true
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixinho;
var moeda;
var placar;
var pontuacao = 0;
var tamanho = 1;

function preload() {
    this.load.image('mar', 'assets/bg_azul-escuro.png');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('moeda', 'assets/moeda.png');
    this.load.image('peixe_1', 'assets/peixes/peixinho_laranja.png');
}

function create() {
    this.add.image(400, 300, 'mar');
    this.add.image(400, 525, 'logo').setScale(0.5);

    placar = this.add.text(50, 50, 'Moedas:'+ pontuacao, {fontSize:'25px', fill:'#ffffff'});


    peixinho = this.physics.add.sprite(400, 300, 'peixe_1').setScale(tamanho);
    //peixinho.setCollideWorldBounds(true);
    peixinho.body.allowGravity = false;

    moeda = this.physics.add.sprite(larguraJogo/2, 0, 'moeda');
    moeda.setCollideWorldBounds(true);
    moeda.setBounce(0.7);

    this.physics.add.overlap(peixinho, moeda, function(){
        moeda.setVisible(false);
        var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650);
        moeda.setPosition(posicaoMoeda_Y, 100);
        pontuacao += 1;
        tamanho += 0.0005;
        moeda.setVelocity(0, 0);
        peixinho.setScale(tamanho);
        placar.setText('Moedas:' + pontuacao);
        moeda.setVisible(true);
    });


}

function update() {
    peixinho.x = this.input.x;
    peixinho.y = this.input.y;

    // se o peixinho está próximo das bordas, flip horizontal
    if (peixinho.x < peixinho.width / 2) {
        peixinho.setFlipX(true);
    } else if (peixinho.x > larguraJogo - peixinho.width / 2) {
        peixinho.setFlipX(false);
    }
}




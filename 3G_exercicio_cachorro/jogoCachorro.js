// Define as dimensões do jogo
var larguraJogo = 750;
var alturaJogo = 600;

// Configurações do jogo
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

    // Definição das funções dessa cena
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Inicializa o jogo com as configurações fornecidas
var game = new Phaser.Game(config);

// Declaração de variáveis
var cachorro;
var pizza;
var placar;
var petiscos = 0;

// Função para carregar recursos antes do jogo iniciar
function preload() {
    this.load.image('fundo', 'assets/fundoRosa.jpg');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('pizza', 'assets/bola.png'); // Substitui "bola" por "pizza"
    this.load.image('cachorro', 'assets/Lucio.png');
}

// Função para criar elementos do jogo
function create() {
    this.add.image(400, 300, 'fundo');
    this.add.image(400, 525, 'logo').setScale(0.5);

    // Centraliza o placar
    placar = this.add.text(larguraJogo / 2 - 50, 50, 'Petiscos: ' + petiscos, { fontSize: '25px', fill: '#ffffff' });

    cachorro = this.physics.add.sprite(400, 300, 'cachorro').setScale(0.5);
    cachorro.body.allowGravity = false;

    pizza = this.physics.add.sprite(larguraJogo / 2, 0, 'pizza').setScale(0.5); 

    pizza.setCollideWorldBounds(true);
    pizza.setBounce(0.7);

    this.physics.add.overlap(cachorro, pizza, function () {
        pizza.setVisible(false);
        var posicaoPizza_Y = Phaser.Math.RND.between(50, 650);
        pizza.setPosition(posicaoPizza_Y, 100);
        petiscos += 1;

        placar.setText('Petiscos: ' + petiscos);
        pizza.setVisible(true);
    });
}

// Função para atualizar o estado do jogo
function update() {
    cachorro.x = this.input.x;
    cachorro.y = this.input.y;

    if (cachorro.x < cachorro.width / 2) {
        cachorro.setFlipX(true);
    } else if (cachorro.x > larguraJogo - cachorro.width / 2) {
        cachorro.setFlipX(false);
    }
}

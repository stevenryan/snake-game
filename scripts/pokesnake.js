window.onload = function() {

    //variables that will hold data, direction values that change once you move
    var head, tail, cursors, snake, pokemon, gameText, playerDirection;
    var directions = Object.freeze({up: 0, down: 1, right: 2, left: 3});

    var canvasWidth = 896, canvasHeight = 704;
    var playerSize = 64;
    var x = 64, y = 0;
    var frameCounter = 0;
    var gameSpeed = 20;
    var score = 0;

    var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {
        game.load.image('pokeball', 'images/pokeball-tail.png');
        game.load.image('background', 'images/white-bg.png');
        game.load.spritesheet('player', 'images/ash-player.png');
        game.load.image('1', 'images/sprites/1.png');
        game.load.image('2', 'images/sprites/2.png');
        game.load.image('3', 'images/sprites/3.png');
        game.load.image('4', 'images/sprites/4.png');
        game.load.image('5', 'images/sprites/5.png');
        game.load.image('6', 'images/sprites/6.png');
        game.load.image('7', 'images/sprites/7.png');
        game.load.image('8', 'images/sprites/8.png');
        game.load.image('9', 'images/sprites/9.png');
        game.load.image('10', 'images/sprites/10.png');
        game.load.image('11', 'images/sprites/11.png');
        game.load.image('12', 'images/sprites/12.png');
        game.load.image('13', 'images/sprites/13.png');
        game.load.image('14', 'images/sprites/14.png');
        game.load.image('15', 'images/sprites/15.png');
        game.load.image('16', 'images/sprites/16.png');
        game.load.image('17', 'images/sprites/17.png');
        game.load.image('18', 'images/sprites/18.png');
        game.load.image('19', 'images/sprites/19.png');
        game.load.image('20', 'images/sprites/20.png');
        game.load.image('21', 'images/sprites/21.png');
        game.load.image('22', 'images/sprites/22.png');
        game.load.image('23', 'images/sprites/23.png');
        game.load.image('24', 'images/sprites/24.png');
        game.load.image('25', 'images/sprites/25.png');
        game.load.image('26', 'images/sprites/26.png');
        game.load.image('27', 'images/sprites/27.png');
        game.load.image('28', 'images/sprites/28.png');
        game.load.image('29', 'images/sprites/29.png');
        game.load.image('30', 'images/sprites/30.png');
        game.load.image('31', 'images/sprites/31.png');
        game.load.image('32', 'images/sprites/32.png');
        game.load.image('33', 'images/sprites/33.png');
        game.load.image('34', 'images/sprites/34.png');
        game.load.image('35', 'images/sprites/35.png');
        game.load.image('36', 'images/sprites/36.png');
        game.load.image('37', 'images/sprites/37.png');
        game.load.image('38', 'images/sprites/38.png');
        game.load.image('39', 'images/sprites/39.png');
        game.load.image('40', 'images/sprites/40.png');
        game.load.image('41', 'images/sprites/41.png');
        game.load.image('42', 'images/sprites/42.png');
        game.load.image('43', 'images/sprites/43.png');
        game.load.image('44', 'images/sprites/44.png');
        game.load.image('45', 'images/sprites/45.png');
        game.load.image('46', 'images/sprites/46.png');
        game.load.image('47', 'images/sprites/47.png');
        game.load.image('48', 'images/sprites/48.png');
        game.load.image('49', 'images/sprites/49.png');
        game.load.image('50', 'images/sprites/50.png');
        game.load.image('51', 'images/sprites/51.png');
        game.load.image('52', 'images/sprites/52.png');
        game.load.image('53', 'images/sprites/53.png');
        game.load.image('54', 'images/sprites/54.png');
        game.load.image('55', 'images/sprites/55.png');
        game.load.image('56', 'images/sprites/56.png');
        game.load.image('57', 'images/sprites/57.png');
        game.load.image('58', 'images/sprites/58.png');
        game.load.image('59', 'images/sprites/59.png');
        game.load.image('60', 'images/sprites/60.png');
    }

    function create() {
        game.add.image(0, 0, 'background');
        gameText = game.add.text(canvasWidth, 0, "0", {
            font: "28px Arial",
            fill: "#000000",
        });
        //keep score text in top right of canvas
        gameText.anchor.setTo(1, 0);
        startGame();
        randomPokemon();
        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        gameText.text = score;
        updateDirection();
        frameCounter++;
        if (frameCounter == gameSpeed) {
            movePlayer();
            //adds new head image in the direction you're going in
            if (selfCollide()) {
              //alerts with score, clears the values
                alert("Game Over! You caught " + score + " Pokemon!");
                clearGame();
                startGame();
                score = 0;
                gameSpeed = 20;
                playerDirection = undefined;
                x = 64;
                y = 0;
                gameText.text = "";
            }
            if (pokemonCollide()) {
              //ups score and speed, generates a new random pokemon placement
                score++;
                pokemon.destroy();
                randomPokemon();
                gameSpeed--;
                if (gameSpeed <= 5) gameSpeed = 5;
            } else if (playerDirection != undefined) {
                removeTail();
                //deletes tail image after adding a new head image (looks like moving)
            }
            frameCounter = 0;
        }
    }

    function startGame() {
        head = new Object();
        newHead(0, 0);
        tail = head;
        newHead(64, 0);
        //starting location of player
    }

    function clearGame() {
        while (tail != null) {
            tail.image.destroy();
            tail = tail.next;
        }
        head = null;
    }

    function randomPokemon() {
        if (pokemon != undefined) pokemon.destroy();
        randomNum = Math.ceil(Math.random() * Math.floor(50)).toString();
        pokemon = game.add.image(0, 0, randomNum);
        do {
            pokemon.position.x = Math.floor(Math.random() * 14) * 64;
            pokemon.position.y = Math.floor(Math.random() * 11) * 64;
        } while (pokemonCollide());
        //generates random (x,y) location on a 64x64 grid
    }

    function newHead(x, y) {
        var newHead = new Object();
        newHead.image = game.add.image(x, y, 'pokeball');
        newHead.next = null;
        head.next = newHead;
        head = newHead;
    }

    function removeTail(x, y) {
        tail.image.destroy();
        tail = tail.next;
    }

    function pokemonCollide() {
        var growTail = tail;
        var collides = false;
        var tailLength = 0;
        while (growTail != null) {
            tailLength++;
            if (pokemon.position.x == growTail.image.position.x &&
                pokemon.position.y == growTail.image.position.y) {
                collides = true;
            }
            growTail = growTail.next;
        }
        return collides;
    }

    function selfCollide() {
        var growTail = tail;
        var collides = false;
        while (growTail.next != head) {
            if (growTail.image.position.x == head.image.position.x &&
                growTail.image.position.y == head.image.position.y) {
                collides = true;
            }
            growTail = growTail.next;
        }
        return collides;
    }

    function updateDirection() {
        if (cursors.right.isDown && playerDirection != directions.left) {
            playerDirection = directions.right;
        }
        if (cursors.left.isDown && playerDirection != directions.right) {
            playerDirection = directions.left;
        }
        if (cursors.up.isDown && playerDirection != directions.down) {
            playerDirection = directions.up;
        }
        if (cursors.down.isDown && playerDirection != directions.up) {
            playerDirection = directions.down;
        }
    }

    function movePlayer() {
        if (playerDirection == directions.right) {
            x += playerSize;
        } else if (playerDirection == directions.left) {
            x -= playerSize;
        } else if (playerDirection == directions.up) {
            y -= playerSize;
        } else if (playerDirection == directions.down) {
            y += playerSize;
        }
        if (x <= 0 - playerSize) {
            x = canvasWidth - playerSize;
        } else if (x >= canvasWidth) {
            x = 0;
        } else if (y <= 0 - playerSize) {
            y = canvasHeight - playerSize;
        } else if (y >= canvasHeight) {
            y = 0;
        }
        if (playerDirection != undefined) {
            newHead(x, y);
        }
    }
};

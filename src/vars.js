const rng = (n = 4) => Math.floor(Math.random() * n);


const colors = {
    player: '#fff',
    walkable: {
        seen: "transparent",
        unseen: '#000000dd'
    },
    // walkable: "transparent",
    unwalkable: '#000',
    enemy: '#940404',
    fovHighlight: "#3370d422",
    walkHighlight: '#08fa2566'
}

/* ==================================
HTML ELEMENTS
==================================== */
const getEl = document.querySelector;
const game = document.querySelector("#gameBG");
const ctx = game.getContext("2d");
const body = document.querySelector('body')
const _btnStart = document.querySelector('.toggle-game')
const _btnReset = document.querySelector('.reset')
const _container = document.querySelector('.container')
const _landing = document.querySelector('.headline')

// ***** PLAYER STATS *****
// Level
const _playerLvl = document.querySelector('#playerLvl')
const _expCurrent = document.querySelector('#playerExp')
const _expToNextLvl = document.querySelector('#nextExp')
const _lvlUpAtk = document.querySelector('#lvlUpAtk')
const _lvlUpDef = document.querySelector('#lvlUpDef')
const _lvlUpAgil = document.querySelector('#lvlUpAgil')
const _lvlUpFOV = document.querySelector('#lvlUpFOV')


// Info
const _playerName = document.querySelector('#playerName')
const _healthpointsCurrent = document.querySelector('#playerHealthCurrent')
const _healthpointsMax = document.querySelector('#playerHealthMax')
const playerClass = document.querySelector('#playerClass')

// Fighting Details
const _playerAttackStrength = document.querySelector('#playerAttackStrength')
const _playerAttackSpeed = document.querySelector('#playerAttackSpeed')
const _playerDefense = document.querySelector('#playerDefense')
const _playerAgility = document.querySelector('#playerAgility')
const _playerFOV = document.querySelector('#playerFOV')
const _actionsTotal = document.querySelector('#actionsPerTurn')
const _actionsLeft = document.querySelector('#actionsLeft')
const _lvlUp = document.querySelector('.level-up')
const _attackBtn = document.querySelector('#attackBtn')
const _moveBtn = document.querySelector('#moveBtn')
//  Game Details
const _dungeon = document.querySelector('#dungeon')
const _steps = document.querySelector('#steps')

// ***** ENEMY STATS *****
const _enemyDetails = document.querySelector('.enemy-details')
const _enemySeesPlayer = document.querySelector('#enemySeesPlayer')

/* ==================================
CONSTANTS USED TO DEFINE THE DUNGEON CONSTRAINTS
==================================== */
const NUMBER_OF_ROWS = 16;
const NUMBER_OF_COLUMNS = 16; 
const CHECKER_INT = Math.pow(NUMBER_OF_COLUMNS - 2, 2) + 4;
const CANVAS_HEIGHT = NUMBER_OF_COLUMNS * NUMBER_OF_COLUMNS;
const CANVAS_WIDTH = NUMBER_OF_ROWS * NUMBER_OF_ROWS;
const ROWS = new Array(NUMBER_OF_ROWS).fill();
const COLUMNS = new Array(NUMBER_OF_COLUMNS).fill();
const TILE_HEIGHT = (CANVAS_HEIGHT / NUMBER_OF_ROWS);
const TILE_WIDTH = (CANVAS_WIDTH / NUMBER_OF_ROWS);
const WALKABLE_TILE_CHANCE = 0.8;
const xyMax = TILE_HEIGHT * TILE_HEIGHT - TILE_HEIGHT;
/* ==================================
==================================== */


game.setAttribute('width', CANVAS_WIDTH)
game.setAttribute('height', CANVAS_HEIGHT)

/* ==================================
VARIABLES FOR HANDLING GAMEPLAY
==================================== */
// object of all 'tiles' on game-grid
const COORDINATES = {};
// object of all 'walkable tiles' on game-grid
const WALKABLE_COORDINATES = []
// total steps walked by player this game
let steps = 1;
// current dungeon the player is on
let dungeon = 1;
// total exp given to player for completing dungeon
let dungeonEXP = 20 + 10 * dungeon

let player;
// player level
let lvl = 1;
// current coordinate of the player
let playerCoord = [];
let playersTurn = true
// ENEMY INFORMATION
// # of enemies this dungeon
// array of positions for each enemy
let enemies = [];

let handleKeyPress;
//   ENEMY POPULATION BY LEVEL:
// 1-10. [0,2]
// 11-20. [0,3]
let enemyCount;

// 	 ENEMY **TOTAL** POWER LVL BY LEVEL
// 1-5. 100 POINTS
// 6-10. 150 POINTS
// 11-15. 225 POINTS

let totalEnemyPower = 100;
const enemyPowerMult = () => lvl % 5 == 0 ? totalEnemyPower = ~~(totalEnemyPower * 1.5) : 0;

/* ==================================
==================================== */

// TIMER FOR ENEMY MOVEMENT
let moveTimer;

// EXITS FOR DUNGEON
let exits;
// const rooms = []
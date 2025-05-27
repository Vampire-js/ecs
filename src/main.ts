import './style.css';
import ECS from 'ecs'
import { movementSystem } from './systems/movement.system';
import playerComponents from './entities/player.entitiy';
import { addComponents } from './utils/utils';
import { Transform } from './components/transform.component';
import { Sprite } from './components/sprite.component';
import { Movement } from './components/movement.component';
import { PlayerInfo } from './components/playerInfo.component';


//------
const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('Failed to get canvas context');
}
ctx.imageSmoothingEnabled = false;
canvas.width = innerWidth;
canvas.height = innerHeight;
//------


//------

export const world = ECS.addWorld();


// //------
// const BACKGROUND = ECS.addEntity(world)
// addComponents(BACKGROUND, [Transform, Sprite]);
// BACKGROUND.sprite.texture = new Image();
// BACKGROUND.sprite.texture.src = './src/typescript.svg';
// BACKGROUND.sprite.width =canvas.width;
// BACKGROUND.sprite.height = canvas.height;
// //------

//------
const PLAYER = ECS.addEntity(world)
addComponents(PLAYER, [Transform , Sprite, Movement, PlayerInfo]);
let texture = new Image();
texture.src = './src/assets/Run.png';
PLAYER.sprite.isAnimated = true;
PLAYER.playerInfo.name = 'Player 1';
PLAYER.sprite.texture = texture;
PLAYER.sprite.width = 32;
PLAYER.sprite.height = 32;
PLAYER.sprite.frameCount = 12;
PLAYER.sprite.currentFrame = 1;
PLAYER.sprite.frameWidth = 32;
PLAYER.sprite.frameHeight = 32;
//------


ECS.addSystem(world, movementSystem);


let currentTime = performance.now()

const gameLoop = () => {

   const newTime = performance.now()
    const frameTime = newTime - currentTime 
    currentTime = newTime

    ECS.update(world, frameTime/1000);
    ECS.cleanup(world);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const entity of ECS.getEntities(world, [ 'sprite' ])) {
   
   ctx.drawImage(
  entity.sprite.texture,                       
  entity.sprite.currentFrame * entity.sprite.frameWidth, 
  0,                                           
  entity.sprite.frameWidth,                   
  entity.sprite.frameHeight,                  
  entity.transform.position.x - entity.sprite.offsetX, 
  entity.transform.position.y - entity.sprite.offsetY, 
  entity.sprite.width,                        
  entity.sprite.height                        
);
    if(newTime%entity.sprite.duration == 0 && entity.sprite.isAnimated) {
      entity.sprite.currentFrame = (entity.sprite.currentFrame + 1) % entity.sprite.frameCount;
    }
  }

  for (const entity of ECS.getEntities(world, [ 'playerInfo' ])) {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`${entity.playerInfo.name}`, entity.transform.position.x + 10, entity.transform.position.y - 10);
     }
  
  requestAnimationFrame(gameLoop);
}
gameLoop();
import './style.css';
import ECS from 'ecs'
import { movementSystem } from './systems/movement.system';
import playerComponents from './entities/player.entitiy';
import { addComponents } from './utils/utils';
import { Transform } from './components/transform.component';
import { Sprite } from './components/sprite.component';
import { Movement } from './components/movement.component';

//------
const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('Failed to get canvas context');
}
canvas.width = innerWidth;
canvas.height = innerHeight;
//------


//------

export const world = ECS.addWorld();


//------
const BACKGROUND = ECS.addEntity(world)
addComponents(BACKGROUND, [Transform, Sprite]);
BACKGROUND.sprite.texture = new Image();
BACKGROUND.sprite.texture.src = './src/typescript.svg';
BACKGROUND.sprite.width =canvas.width;
BACKGROUND.sprite.height = canvas.height;
//------

//------
const PLAYER = ECS.addEntity(world)
addComponents(PLAYER, [Transform , Sprite, Movement]);
let texture = new Image();
texture.src = './src/typescript.svg';
PLAYER.sprite.texture = texture;
PLAYER.sprite.width = 50;
PLAYER.sprite.height = 50;
//------


ECS.addSystem(world, movementSystem);


let currentTime = performance.now()

const gameLoop = () => {

   const newTime = performance.now()
    const frameTime = newTime - currentTime  // in milliseconds, e.g. 16.64356
    currentTime = newTime

    ECS.update(world, frameTime/1000);
    ECS.cleanup(world);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const entity of ECS.getEntities(world, [ 'sprite' ])) {
   
      ctx.drawImage(
        entity.sprite.texture,
        entity.transform.position.x - entity.sprite.offsetX,
        entity.transform.position.y - entity.sprite.offsetY,
        entity.sprite.width,
        entity.sprite.height
      );
      entity.sprite.currentFrame = (entity.sprite.currentFrame + 1) % entity.sprite.frameCount;
    
  }
  
  requestAnimationFrame(gameLoop);
}
gameLoop();
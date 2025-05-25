import ECS from 'ecs'

const keysDown: Record<string, boolean> = {};

window.addEventListener('keydown', (e) => {
  keysDown[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keysDown[e.key] = false;
});


export function movementSystem(world: any) {
  const onUpdate = (dt: number) => {
    for (const entity of ECS.getEntities(world, ['movement'])) {
      const pos = entity.transform.position;

      if (keysDown['w']) pos.y -= entity.movement.speed * dt;
      if (keysDown['s']) pos.y += entity.movement.speed * dt;
      if (keysDown['a']) pos.x -= entity.movement.speed * dt;
      if (keysDown['d']) pos.x += entity.movement.speed * dt;
    }
  };

  return { onUpdate };
}

import ECS from 'ecs'

export function animationSystem(world: any) {
  const onUpdate = (dt: number) => {
    for (const entity of ECS.getEntities(world, ['animator'])) {
      
    }
  };

  return { onUpdate };
}

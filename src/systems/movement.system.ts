import ECS from 'ecs'

export function movementSystem(world:any){
  const onUpdate = (dt: any) => {

    for (const entity of ECS.getEntities(world, [ 'transform'])) {
            entity.transform.position.x += 100 * dt
            entity.transform.position.y += 100 * dt
        }
  }
  return {onUpdate}
}
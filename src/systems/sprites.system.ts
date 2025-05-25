import ECS from 'ecs'

export function spritesSystem(world:any){
  const onUpdate = (dt: any) => {

    for (const entity of ECS.getEntities(world, [ 'sprite'])) {
            entity.sprite.ition.x += 100 * dt
            entity.sprite.ition.y += 100 * dt
        }
  }
  return {onUpdate}
}
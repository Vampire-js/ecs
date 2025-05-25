import { world } from "../main";
import ECS from "ecs";

export function addComponents(entity:any , components: any[]) {
  for (const component of components) {
     const clonedComponent = JSON.parse(JSON.stringify(component.component));
    ECS.addComponent(world, entity, component.name, clonedComponent);
  }
}
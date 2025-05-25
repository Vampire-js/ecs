import { world } from "../main";
import ECS from "ecs";

export function addComponents(entity:any , components: any[]) {
  for (const component of components) {
    ECS.addComponent(world, entity, component.name, component.component);
  }
}
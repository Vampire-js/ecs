import { Vector } from '../utils/Vector'

export const Transform = {
    name: 'transform',
    component:{
        position: new Vector(0,0),
        rotation: new Vector(0,0),
        scale: new Vector(1,1)
    }
}
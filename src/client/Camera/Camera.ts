import { PerspectiveCamera } from 'three'

export class Camera extends PerspectiveCamera {
    constructor() {
        super()

        this.fov = 75
        this.aspect = window.innerWidth / window.innerHeight
        this.near = 1.0
        this.far = 1000
        this.position.x = 0
        this.position.y = 15
        this.position.z = -50

        this.lookAt(0, 0, 0)
    }
}

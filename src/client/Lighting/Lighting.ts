import { AmbientLight, DirectionalLight, PointLight, Scene } from 'three'

export class Lighting {
    constructor(scene: Scene) {
        const light = new AmbientLight(0x404040, 8) // soft white light
        const directionalLight = new DirectionalLight(0xffffff, 0.5)
        const pointLight = new PointLight(0xff0000, 1, 100)

        scene.add(pointLight)
        scene.add(directionalLight)
        scene.add(light)
    }
}

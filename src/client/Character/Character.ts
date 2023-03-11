import { Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Character {
    constructor(scene: Scene) {
        const loader = new GLTFLoader()

        loader.load(
            'assets/character.glb',
            function (gltf) {
                scene.add(gltf.scene)
            },
            undefined,
            function (error) {
                console.error(error)
            }
        )
    }
}

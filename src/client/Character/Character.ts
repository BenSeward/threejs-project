import { Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CharacterController } from './CharacterController'

export class Character {
    constructor() {
        // const loader = new GLTFLoader()
        // loader.load(
        //     'assets/character.glb',
        //     function (gltf) {
        //         return gltf
        //     },
        //     undefined,
        //     function (error) {
        //         console.error(error)
        //     }
        // )
    }

    async load(callback: any) {
        const loader = new GLTFLoader()

        return loader.load('assets/character.glb', (gltf) => callback(gltf))
    }
}

import * as THREE from 'three'
import { Camera } from '../Camera/Camera'
import { Renderer } from '../Renderer/Renderer'
import { Lighting } from '../Lighting/Lighting'
import { Character } from '../Character/Character'
import { CharacterController } from '../Character/CharacterController'
import { Floor } from '../Floor/Floor'

export class Experience {
    constructor() {
        const scene = new THREE.Scene()
        const camera = new Camera()
        const renderer = new Renderer()
        const characterController = new CharacterController()

        let character: any = null

        new Character().load((gltf: any) => {
            character = gltf
            scene.add(gltf.scene)
        })

        new Lighting(scene)
        new Floor(scene)

        function animate() {
            requestAnimationFrame(animate)

            // @TODO: Is this a bad idea passing it like this?
            characterController.update(character, camera)

            render()
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()

        document.body.appendChild(renderer.domElement)
    }
}

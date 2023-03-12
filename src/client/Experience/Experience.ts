import * as THREE from 'three'
import { Camera } from '../Camera/Camera'
import { Renderer } from '../Renderer/Renderer'
import { Lighting } from '../Lighting/Lighting'
import { Character } from '../Character/Character'
import { CharacterController } from '../Character/CharacterController'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Experience {
    constructor() {
        const scene = new THREE.Scene()
        const camera = new Camera()
        const renderer = new Renderer()
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x378805 })
        const floorGeometry = new THREE.PlaneGeometry(20, 20, 10, 10)
        const mesh = new THREE.Mesh(floorGeometry, floorMaterial)
        let character: any = null
        const characterController = new CharacterController()

        const loader = new GLTFLoader()

        loader.load(
            'assets/character.glb',
            function (gltf) {
                character = gltf
                scene.add(gltf.scene)
            },
            undefined,
            function (error) {
                console.error(error)
            }
        )

        mesh.rotation.x = -Math.PI / 2

        scene.add(mesh)

        new Lighting(scene)

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

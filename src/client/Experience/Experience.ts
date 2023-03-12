import * as THREE from 'three'
import { Camera } from '../Camera/Camera'
import { Renderer } from '../Renderer/Renderer'
import { Lighting } from '../Lighting/Lighting'
import { Character } from '../Character/Character'
import { CharacterController } from '../Character/CharacterController'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3 } from 'three'

export class Experience {
    constructor() {
        const scene = new THREE.Scene()
        const camera = new Camera()
        const renderer = new Renderer()
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x378805 })
        const floorGeometry = new THREE.PlaneGeometry(20, 20, 10, 10)
        const mesh = new THREE.Mesh(floorGeometry, floorMaterial)
        let character: any = null

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

        const keys = {
            up: false,
            right: false,
            down: false,
            left: false,
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') {
                keys.up = true
            }
            if (e.key === 'd') {
                keys.right = true
            }
            if (e.key === 's') {
                keys.down = true
            }
            if (e.key === 'a') {
                keys.left = true
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.key === 'w') {
                keys.up = false
            }
            if (e.key === 'd') {
                keys.right = false
            }
            if (e.key === 's') {
                keys.down = false
            }
            if (e.key === 'a') {
                keys.left = false
            }
        })

        function animate() {
            requestAnimationFrame(animate)

            if (keys.up) {
                character.scene.translateZ(0.25)

                const characterPosition = character.scene.position

                camera.position.set(
                    characterPosition.x,
                    characterPosition.y,
                    characterPosition.z - 20
                )

                camera.position.set(0, 5, characterPosition.z - 10)
                camera.lookAt(characterPosition)
            }

            if (keys.right) {
                character.scene.rotateY(-0.25)
            }

            if (keys.down) {
                character.scene.translateZ(-0.25)
            }

            if (keys.left) {
                character.scene.rotateY(0.25)
            }

            render()
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()

        document.body.appendChild(renderer.domElement)
    }
}

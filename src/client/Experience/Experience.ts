import * as THREE from 'three'
import { Camera } from '../Camera/Camera'
import { Renderer } from '../Renderer/Renderer'
import { Lighting } from '../Lighting/Lighting'
import { Character } from '../Character/Character'

export class Experience {
    constructor() {
        const scene = new THREE.Scene()
        const camera = new Camera()
        const renderer = new Renderer()
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x378805 })
        const floorGeometry = new THREE.PlaneGeometry(20, 20, 10, 10)
        const mesh = new THREE.Mesh(floorGeometry, floorMaterial)

        mesh.rotation.x = -Math.PI / 2

        scene.add(mesh)

        new Lighting(scene)
        new Character(scene, camera)

        function animate() {
            requestAnimationFrame(animate)
            render()
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()

        document.body.appendChild(renderer.domElement)
    }
}

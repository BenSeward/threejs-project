import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera } from '../Camera/Camera'
import { Renderer } from '../Renderer/Renderer'
import { Lighting } from '../Lighting/Lighting'
import { Character } from '../Character/Character'
// import { Experience } from './Experience/Experience'

export class Experience {
    constructor() {
        const scene = new THREE.Scene()
        const camera = new Camera()
        const renderer = new Renderer()
        const controls = new OrbitControls(camera, renderer.domElement)

        new Lighting(scene)
        new Character(scene)

        function animate() {
            requestAnimationFrame(animate)

            controls.update()

            render()
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()

        document.body.appendChild(renderer.domElement)
    }
}

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Experience } from './Experience/Experience'

const experience = new Experience()

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer({ alpha: true })
// const controls = new OrbitControls(camera, renderer.domElement)
// const light = new THREE.AmbientLight(0x404040, 8) // soft white light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// const pointLight = new THREE.PointLight(0xff0000, 1, 100)

// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setSize(window.innerWidth, window.innerHeight)

// camera.position.y = 3
// camera.position.z = 6

// scene.add(pointLight)
// scene.add(directionalLight)
// scene.add(light)

// document.body.appendChild(renderer.domElement)

// // Character Model
// const loader = new GLTFLoader()

// loader.load(
//     'assets/character.glb',
//     function (gltf) {
//         console.log('loading...')
//         scene.add(gltf.scene)
//     },
//     undefined,
//     function (error) {
//         console.error(error)
//     }
// )

// function animate() {
//     requestAnimationFrame(animate)

//     controls.update()

//     render()
// }

// function render() {
//     renderer.render(scene, camera)
// }

// animate()

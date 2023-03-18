import * as THREE from 'three'
import { Camera } from '../Camera/Camera'
import { Renderer } from '../Renderer/Renderer'
import { Lighting } from '../Lighting/Lighting'
import { Character } from '../Character/Character'
import { CharacterController } from '../Character/CharacterController'
import { Floor } from '../Floor/Floor'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CannonDebugger from 'cannon-es-debugger'
import { Scene } from 'three'
import { World } from 'cannon-es'

export class Experience {
    constructor() {
        const scene: Scene = new THREE.Scene()
        const camera = new Camera()
        const renderer = new Renderer()

        const world: World = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0),
        })
        const cannonDebugger = CannonDebugger(scene, world)

        const orbitControls = new OrbitControls(camera, renderer.domElement)
        orbitControls.enableDamping = true
        orbitControls.minDistance = 5
        orbitControls.maxDistance = 15
        orbitControls.enablePan = false
        orbitControls.maxPolarAngle = Math.PI / 2 - 0.05
        orbitControls.update()

        const characterController = new CharacterController(orbitControls, camera)

        // ------- ground --------

        // Generate some height data (y-values).
        // const data = []

        // for (let i = 0; i < 10; i++) {
        //     const y = 0.5 * Math.cos(0.2 * i)
        //     data.push(y)
        // }

        const data = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]

        // Create the heightfield shape
        const groundMaterial = new CANNON.Material('ground')
        const heightfieldShape = new CANNON.Heightfield(data, {
            elementSize: 10, // Distance between the data points in X and Y directions
        })

        const heightfieldBody = new CANNON.Body({
            shape: heightfieldShape,
            mass: 0,
            material: groundMaterial,
            position: new CANNON.Vec3(-5, 0, 6),
        })

        heightfieldBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up

        world.addBody(heightfieldBody)

        // const groundBody = new CANNON.Body({
        //     type: CANNON.Body.STATIC,
        //     shape: new CANNON.Plane(),
        // })
        // groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
        // world.addBody(groundBody)

        // const groundGeo = new THREE.PlaneGeometry(30, 30)
        // const groundMat = new THREE.MeshBasicMaterial({
        //     color: 0x144734,
        //     side: THREE.DoubleSide,
        //     wireframe: false,
        // })
        // const groundMesh = new THREE.Mesh(groundGeo, groundMat)

        // scene.add(groundMesh)

        // ------- end of ground --------
        // ------- box --------

        const physBoxMaterial = new CANNON.Material()

        const boxBody: any = new CANNON.Body({
            mass: 1,
            type: CANNON.Body.DYNAMIC,
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
            position: new CANNON.Vec3(1, 5, 0),
            material: physBoxMaterial,
        })

        const boxGeo = new THREE.BoxGeometry(2, 2, 2)
        const boxMat = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: false,
        })

        world.addBody(boxBody)

        const ground_ground = new CANNON.ContactMaterial(groundMaterial, physBoxMaterial, {
            friction: 0.8,
        })

        // Add contact material to the world
        world.addContactMaterial(ground_ground)

        // ------- end of box --------
        // ------- Wall --------
        const wallPhysMat = new CANNON.Material()

        const wallBody: any = new CANNON.Body({
            mass: 100,
            type: CANNON.Body.STATIC,
            shape: new CANNON.Box(new CANNON.Vec3(3, 5, 0.2)),
            position: new CANNON.Vec3(0, -1, 5),
            material: wallPhysMat,
        })
        world.addBody(wallBody)
        // ------- end of Wall --------

        let character: any = null

        new Character().load((gltf: any) => {
            character = gltf
            scene.add(gltf.scene)
        })

        new Lighting(scene)
        // new Floor(scene)

        const timeStep = 1 / 60
        const clock = new THREE.Clock()

        function animate() {
            let mixerUpdateDelta = clock.getDelta()

            characterController.update(boxBody, mixerUpdateDelta)

            orbitControls.update()

            // groundMesh.position.copy(groundBody.position)
            // groundMesh.quaternion.copy(groundBody.quaternion)

            // boxMesh.position.copy(boxBody.position)
            // boxMesh.quaternion.copy(boxBody.quaternion)

            // @TODO: Is this a bad idea passing it like this?
            // characterController.update(character, camera)

            // world.step(timeStep)

            cannonDebugger.update()
            world.fixedStep()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()

        document.body.appendChild(renderer.domElement)
    }
}

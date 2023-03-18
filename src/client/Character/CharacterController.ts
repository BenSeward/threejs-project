import { Vec3 } from 'cannon-es'
import * as THREE from 'three'
import { Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CharacterController {
    keys: { up: boolean; right: boolean; down: boolean; left: boolean }
    rotation: number

    // temporary data
    walkDirection = new THREE.Vector3()
    rotateAngle = new THREE.Vector3(0, 1, 0)
    rotateQuarternion: THREE.Quaternion = new THREE.Quaternion()
    cameraTarget = new THREE.Vector3()

    // constants
    fadeDuration: number = 0.2
    runVelocity = 5
    walkVelocity = 2
    orbitControls: OrbitControls
    camera: THREE.Camera

    constructor(orbitControls: OrbitControls, camera: Camera) {
        this.keys = {
            up: false,
            right: false,
            down: false,
            left: false,
        }
        this.rotation = 0
        this.orbitControls = orbitControls
        this.camera = camera

        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') {
                this.keys.up = true
            }
            if (e.key === 'd') {
                this.keys.right = true
            }
            if (e.key === 's') {
                this.keys.down = true
            }
            if (e.key === 'a') {
                this.keys.left = true
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.key === 'w') {
                this.keys.up = false
            }
            if (e.key === 'd') {
                this.keys.right = false
            }
            if (e.key === 's') {
                this.keys.down = false
            }
            if (e.key === 'a') {
                this.keys.left = false
            }
        })
    }

    update(character: any, delta: any) {
        if (character) {
            var angleYCameraDirection = Math.atan2(
                this.camera.position.x - character.position.x,
                this.camera.position.z - character.position.z
            )
            // diagonal movement angle offset
            var directionOffset = this.directionOffset()

            // rotate model
            this.rotateQuarternion.setFromAxisAngle(
                this.rotateAngle,
                angleYCameraDirection + directionOffset
            )
            character.quaternion.setFromAxisAngle(this.rotateQuarternion, 0.2)

            // calculate direction
            this.camera.getWorldDirection(this.walkDirection)
            this.walkDirection.y = 0
            this.walkDirection.normalize()
            this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)

            let delta = 0

            if (this.keys.up) {
                delta = 0.5
            }

            if (this.keys.down) {
                delta = 0.5
            }

            // move model & camera
            const moveX = delta * this.walkDirection.x
            const moveZ = delta * this.walkDirection.z

            character.position.x += moveX
            character.position.z += moveZ

            this.updateCameraTarget(moveX, moveZ, character)

            // ====================
            // const { x, y, z } = character.position

            // if (this.keys.up) {
            //     console.log(character)

            //     character.position.set(x, y, character.position.z + 0.15)
            // }

            // if (this.keys.right) {
            //     this.rotation -= 0.025
            //     character.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI * this.rotation)
            // }

            // if (this.keys.down) {
            //     character.position.set(x, y, z - 0.15)
            // }

            // if (this.keys.left) {
            //     console.log(character.quaternion)
            //     this.rotation += 0.025
            //     character.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI * this.rotation)
            // }

            // const characterPosition = character.position

            // camera.position.set(
            //     characterPosition.x,
            //     characterPosition.y + 10,
            //     characterPosition.z - 30
            // )
            // camera.lookAt(characterPosition.x, characterPosition.y, characterPosition.z)
        }
    }

    private directionOffset() {
        var directionOffset = 0 // w

        if (this.keys.up) {
            if (this.keys.left) {
                directionOffset = Math.PI / 4 // w+a
            } else if (this.keys.right) {
                directionOffset = -Math.PI / 4 // w+d
            }
        } else if (this.keys.down) {
            if (this.keys.left) {
                directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
            } else if (this.keys.right) {
                directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
            } else {
                directionOffset = Math.PI // s
            }
        } else if (this.keys.left) {
            directionOffset = Math.PI / 2 // a
        } else if (this.keys.right) {
            directionOffset = -Math.PI / 2 // d
        }

        return directionOffset
    }

    private updateCameraTarget(moveX: number, moveZ: number, character: any) {
        // move camera
        this.camera.position.x += moveX
        this.camera.position.z += moveZ

        // update camera target
        this.cameraTarget.x = character.position.x
        this.cameraTarget.y = character.position.y + 1
        this.cameraTarget.z = character.position.z
        this.orbitControls.target = this.cameraTarget
    }
}

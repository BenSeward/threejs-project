import * as THREE from 'three'
import { Scene } from 'three'

export class Floor {
    constructor(scene: Scene) {
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x378805 })
        const floorGeometry = new THREE.PlaneGeometry(20, 20, 10, 10)
        const mesh = new THREE.Mesh(floorGeometry, floorMaterial)

        mesh.rotation.x = -Math.PI / 2

        scene.add(mesh)
    }
}

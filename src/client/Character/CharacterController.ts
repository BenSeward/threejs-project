export class CharacterController {
    constructor(character: any, camera: any) {
        const characterPosition = character.scene.position

        camera.lookAt(0, 0, 20)
        camera.position.set(0, 5, -10)
    }
}

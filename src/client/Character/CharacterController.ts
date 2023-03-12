export class CharacterController {
    keys: { up: boolean; right: boolean; down: boolean; left: boolean }

    constructor() {
        this.keys = {
            up: false,
            right: false,
            down: false,
            left: false,
        }

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

    update(character: any, camera: any) {
        if (character) {
            if (this.keys.up) {
                character.scene.translateZ(0.15)
            }

            if (this.keys.right) {
                character.scene.rotateY(-0.05)
            }

            if (this.keys.down) {
                character.scene.translateZ(-0.15)
            }

            if (this.keys.left) {
                character.scene.rotateY(0.05)
            }

            const characterPosition = character.scene.position

            camera.position.set(characterPosition.x, characterPosition.y, characterPosition.z - 20)

            camera.position.set(0, 5, characterPosition.z - 10)
            camera.lookAt(characterPosition)
        }
    }
}

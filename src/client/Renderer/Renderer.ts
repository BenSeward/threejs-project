import { WebGLRenderer } from 'three'

export class Renderer extends WebGLRenderer {
    constructor() {
        super()
        // this.setClearColor('#ffffff')
        this.setSize(window.innerWidth, window.innerHeight)
        this.setPixelRatio(window.devicePixelRatio)
    }
}

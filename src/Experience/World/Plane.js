import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Plane {
    constructor()
    {
        this.speed = new THREE.Vector3(0,0,0)
        this.acceleration = new THREE.Vector3(0, 0, 0)
        this.maxSpeed = 2

        // Bind event listeners
        window.addEventListener('keydown', (e) => this.onKeyDown(e), false)
        window.addEventListener('keyup', (e) => this.onKeyUp(e), false)

        // Keep track of which keys are pressed atm
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false
        }

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('plane')
        }

        // Resource
        this.resource = this.resources.items.planeModel

        this.setModel()
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 37: // left
            case 65: // a
                this.keys.left = true
                break;

            case 38: // up
            case 87: // w
                this.keys.up = true
                break;

            case 39: // right
            case 68: // d
                this.keys.right = true
                break

            case 40: // down
            case 83: // s
                this.keys.down = true
                break
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 37: // left
            case 65: // a
                this.keys.left = false
                break

            case 38: // up
            case 87: // w
                this.keys.up = false
                break

            case 39: // right
            case 68: // d
                this.keys.right = false
                break

            case 40: // down
            case 83: // s
                this.keys.down = false
                break
        }
    }

    update() 
    {
        if (this.keys.up) this.acceleration.z = -0.01
        else if (this.keys.down) this.acceleration.z = 0.01
        else this.acceleration.z = 0

        if (this.keys.left) this.acceleration.x = -0.01
        else if (this.keys.right) this.acceleration.x = 0.01
        else this.acceleration.x = 0

        this.speed.add(this.acceleration)
        console.warn(this.speed);
        this.speed.clampLength(-this.maxSpeed, this.maxSpeed)

        this.model.position.add(this.speed)
    }

    getForwardVector() {
        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(this.model.quaternion);
        return forward;
    }

    setModel()
    {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }
}
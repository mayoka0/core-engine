import * as THREE from 'three';

/**
 * Engine class encapsulates the core Three.js components and handles basic setup.
 */
export class Engine {
    constructor() {
        // Initialize Scene
        this.scene = new THREE.Scene();

        // Initialize Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Initialize Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        // Initialize Lighting
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xffffff, 50);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);

        // Handle Window Resize
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    /**
     * Updates the camera aspect ratio and renderer size on window resize.
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Renders the scene.
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Optional: Helper to start a basic animation loop.
     * @param {Function} updateCallback - Function to call each frame before rendering.
     */
    startLoop(updateCallback) {
        const animate = () => {
            requestAnimationFrame(animate);
            if (updateCallback) updateCallback();
            this.render();
        };
        animate();
    }
}

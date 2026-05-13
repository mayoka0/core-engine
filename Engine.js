import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/**
 * Engine class encapsulates the core Three.js components and handles basic setup.
 * Enhanced with Post-Processing (Bloom & Film Grain) and Advanced Lighting.
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
        
        // Use Reinhard tone mapping for better bloom response
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        document.body.appendChild(this.renderer.domElement);

        // Initialize Lighting
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xffffff, 50);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);

        // Pulsing Light Setup
        this.setupPulsingLight();

        // Singularity Core Setup
        this.singularityIntensity = 1.0;
        this.createSingularity();

        // Post-Processing Pipeline
        this.initPostProcessing();

        // Event Hook System
        this.eventHooks = {};

        // Handle Window Resize
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        // For animation timing
        this.clock = new THREE.Clock();
    }

    /**
     * Sets up the pulsing point light and its default behavior.
     */
    setupPulsingLight() {
        // Neon cyan light by default
        this.pulsingLight = new THREE.PointLight(0x00ffff, 100, 20);
        this.pulsingLight.position.set(0, 2, 0);
        this.scene.add(this.pulsingLight);
        
        this.baseIntensity = 100;
        this.currentPulseIntensity = 0;

        // Setup a listener for 'beat' events
        this.on('beat', () => {
            this.currentPulseIntensity = 500;
        });
    }

    /**
     * Creates the Singularity core at the edge of the scene.
     * Uses an Icosahedron with an advanced GLSL shader for "Space-Time Distortion".
     */
    createSingularity() {
        const geometry = new THREE.IcosahedronGeometry(100, 32); // Increased detail for smoother distortion
        
        this.singularityMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                singularityIntensity: { value: 1.0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                varying vec3 vWorldPosition;

                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    vec4 mvPosition = viewMatrix * worldPosition;
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float singularityIntensity;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                varying vec3 vWorldPosition;

                // Description : Array and textureless GLSL 2D/3D simplex noise function.
                //      Author : Ian McEwan, Ashima Arts.
                //  Maintainer : stegu
                //     Lastmod : 20110822 (ijm)
                //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
                //               Distributed under the MIT License. See LICENSE file.
                //               https://github.com/ashima/webgl-noise
                //               https://github.com/stegu/psrdnoise/blob/main/src/noise3D.glsl

                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

                float snoise(vec3 v) {
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                    // First corner
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 =   v - i + dot(i, C.xxx) ;

                    // Other corners
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );

                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                    vec3 x3 = x0 - D.yyy;      // -0.5

                    // Permutations
                    i = mod289(i);
                    vec4 p = permute( permute( permute(
                               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                    // Gradients: 7x7 points over a square, mapped onto an octahedron.
                    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                    float n_ = 0.142857142857; // 1.0/7.0
                    vec3  ns = n_ * D.wyz - D.xzx;

                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  // mod(p,7*7)

                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);

                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );

                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));

                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);

                    // Normalise gradients
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;

                    // Mix final noise value
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                                    dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vec3 normal = normalize(vNormal);
                    vec3 viewDir = normalize(vViewPosition);
                    
                    // Create moving organic distortions using Simplex Noise
                    float noiseScale = 0.02;
                    float noiseSpeed = 0.5;
                    float n = snoise(vWorldPosition * noiseScale + time * noiseSpeed);
                    float n2 = snoise(vWorldPosition * noiseScale * 2.5 - time * noiseSpeed * 0.5);
                    
                    // Distort the normal for a "Liquid Metal" surface effect
                    vec3 distortedNormal = normalize(normal + (n + n2 * 0.5) * 0.4);
                    
                    float fresnel = pow(1.0 - max(dot(distortedNormal, viewDir), 0.0), 3.0);
                    
                    // Metallic highlights (pseudo-specular)
                    float metallic = pow(max(dot(distortedNormal, viewDir), 0.0), 16.0);
                    
                    // Color Palette: Deep Space Void to Neon Pulse
                    vec3 deepVoid = vec3(0.02, 0.0, 0.05);
                    vec3 neonCyan = vec3(0.0, 0.9, 1.0);
                    vec3 neonPurple = vec3(0.7, 0.1, 1.0);
                    
                    vec3 baseDistortion = mix(neonCyan, neonPurple, n * 0.5 + 0.5);
                    vec3 finalColor = mix(deepVoid, baseDistortion, fresnel);
                    
                    // Add liquid metal chrome sheen
                    finalColor += metallic * vec3(0.9, 0.9, 1.0) * 0.6;
                    
                    // Pulse intensity
                    finalColor *= singularityIntensity;
                    
                    gl_FragColor = vec4(finalColor, 0.9);
                }
            `,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });

        this.singularity = new THREE.Mesh(geometry, this.singularityMaterial);
        this.singularity.position.set(0, 0, -500);
        this.scene.add(this.singularity);

        // Add an inner dark sphere for the "black hole" center
        const innerGeo = new THREE.SphereGeometry(95, 32, 32);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const blackHole = new THREE.Mesh(innerGeo, innerMat);
        this.singularity.add(blackHole);
    }

    /**
     * Initializes the post-processing pipeline.
     */
    initPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        
        // 1. Render Pass
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        // 2. Bloom Pass (UnrealBloomPass) for synthwave glow
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,  // strength
            0.4,  // radius
            0.85  // threshold
        );
        this.composer.addPass(this.bloomPass);

        // 3. Film Grain / Scanline Pass for retro-arcade feel
        this.filmPass = new FilmPass(
            0.35,   // noise intensity
            0.025,  // scanline intensity
            648,    // scanline count
            false   // grayscale
        );
        this.composer.addPass(this.filmPass);

        // 4. Output Pass (Required for proper color mapping)
        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }

    /**
     * Registers an event listener.
     */
    on(event, callback) {
        if (!this.eventHooks[event]) {
            this.eventHooks[event] = [];
        }
        this.eventHooks[event].push(callback);
    }

    /**
     * Triggers a game event.
     */
    trigger(event, data) {
        if (this.eventHooks[event]) {
            this.eventHooks[event].forEach(cb => cb(data));
        }
    }

    /**
     * Updates the camera aspect ratio and renderer size on window resize.
     */
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);
    }

    /**
     * Internal update method for engine-managed components.
     */
    updateEngine() {
        const deltaTime = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        // Pulse intensity decay for point light
        if (this.currentPulseIntensity > 0) {
            this.currentPulseIntensity *= 0.92;
        }
        this.pulsingLight.intensity = this.baseIntensity + this.currentPulseIntensity;
        
        // Subtle color pulsing/shifting for point light
        this.pulsingLight.color.setHSL((time * 0.1) % 1, 1, 0.5);

        // Update Singularity
        if (this.singularityMaterial) {
            this.singularityMaterial.uniforms.time.value = time;
            
            // Apply a base pulsation to singularityIntensity if not modified externally
            const pulse = Math.sin(time * 0.5) * 0.2 + 1.0;
            this.singularityMaterial.uniforms.singularityIntensity.value = this.singularityIntensity * pulse;
            
            // Subtle rotation
            this.singularity.rotation.y += deltaTime * 0.1;
            this.singularity.rotation.z += deltaTime * 0.05;
        }
    }

    /**
     * Renders the scene using the composer.
     */
    render() {
        this.updateEngine();
        this.composer.render();
    }

    /**
     * Starts the animation loop.
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

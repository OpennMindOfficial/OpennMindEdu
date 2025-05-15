
"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import * as SimplexNoiseNS from 'simplex-noise'; // Use namespace import

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const moonRef = useRef<THREE.Mesh | null>(null);
  const moonLightRef = useRef<THREE.PointLight | null>(null);
  const starsRef = useRef<THREE.Group | null>(null);
  const starsLightsRef = useRef<THREE.Group | null>(null);
  const noiseInstanceRef = useRef<any | null>(null); // Store the instance of SimplexNoise

  const starsAmount = 20;

  const cleanupScene = useCallback(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    sceneRef.current?.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });
    sceneRef.current?.clear();

    rendererRef.current = null;
    sceneRef.current = null;
    cameraRef.current = null;
    noiseInstanceRef.current = null;
  }, []);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') {
      return;
    }

    const currentMount = mountRef.current;

    // Attempt to instantiate SimplexNoise
    let NoiseConstructor: any = null;
    if (SimplexNoiseNS && typeof SimplexNoiseNS.SimplexNoise === 'function') {
      NoiseConstructor = SimplexNoiseNS.SimplexNoise;
    } else if (SimplexNoiseNS && typeof (SimplexNoiseNS as any).default === 'function') {
      // Fallback if the constructor is on the default export of the namespace
      NoiseConstructor = (SimplexNoiseNS as any).default;
    } else {
      console.error("SimplexNoise constructor not found in module:", SimplexNoiseNS);
      return; // Cannot proceed without noise
    }

    try {
      noiseInstanceRef.current = new NoiseConstructor();
    } catch (e) {
      console.error("Error instantiating SimplexNoise:", e, "Constructor was:", NoiseConstructor);
      return;
    }
    
    const noise = noiseInstanceRef.current;
    if (!noise || typeof noise.noise3D !== 'function') {
        console.error("SimplexNoise instance is invalid or does not have noise3D method.");
        return;
    }


    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.Fog(0x001a2d, 80, 140);

    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 200);
    cameraRef.current = camera;
    camera.position.set(70, 30, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    rendererRef.current = renderer;
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x001a2d);
    currentMount.appendChild(renderer.domElement);
    
    const localMoonLight = new THREE.PointLight(0xffffff, 2, 150);
    moonLightRef.current = localMoonLight;
    scene.add(localMoonLight);

    const moonLight2 = new THREE.PointLight(0xffffff, 0.6, 150);
    scene.add(moonLight2);
    moonLight2.position.set(20, -20, -25);
    
    const createMoon = () => {
      const geometry = new THREE.SphereGeometry(8, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x26fdd9,
        shininess: 15,
        emissive: 0x2bb2e6,
        emissiveIntensity: 0.8,
      });
      const moon = new THREE.Mesh(geometry, material);
      moonRef.current = moon;
      moon.position.set(-9, 1, -6.5);
      moon.rotation.y = -1;
      scene.add(moon);
      localMoonLight.position.copy(moon.position);
      localMoonLight.position.y += 4;
    };

    const createTerrain = () => {
      const geometry = new THREE.PlaneGeometry(150, 150, 120, 120);
      const m = new THREE.Matrix4();
      m.makeRotationX(Math.PI * -0.5);
      geometry.applyMatrix4(m); // Use applyMatrix4 for modern THREE
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const ratio = noise.noise3D(x * 0.03, z * 0.03, 0);
        positions.setY(i, ratio * 10);
      }
      geometry.computeVertexNormals();
      const material = new THREE.MeshPhongMaterial({  
        color: 0x198257,
        emissive: 0x032f50
      });
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
    };

    const localStars = new THREE.Group();
    starsRef.current = localStars;
    scene.add(localStars);
    const localStarsLights = new THREE.Group();
    starsLightsRef.current = localStarsLights;
    scene.add(localStarsLights);

    const createStars = () => {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      for (let i = 0; i < starsAmount; i++) {
        const star = new THREE.Mesh(geometry, material);
        star.position.x = (Math.random() - 0.5) * 150;
        star.position.z = (Math.random() - 0.5) * 150;
        const ratio = noise.noise3D(star.position.x * 0.03, star.position.z * 0.03, 0);
        star.position.y = ratio * 10 + 0.3;
        localStars.add(star);
        const velX = (Math.random() + 0.1) * 0.1 * (Math.random() < 0.5 ? -1 : 1);
        const velZ = (Math.random() + 0.1) * 0.1 * (Math.random() < 0.5 ? -1 : 1);
        (star as any).vel = new THREE.Vector2(velX, velZ);

        const starLight = new THREE.PointLight(0xffffff, 0.8, 3);
        starLight.position.copy(star.position);
        starLight.position.y += 0.5;
        localStarsLights.add(starLight);
      }
    };

    createMoon();
    createTerrain();
    createStars();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      if (localStars && localStarsLights && noise) {
        for (let i = 0; i < starsAmount; i++) {
          const star = localStars.children[i] as THREE.Mesh & { vel: THREE.Vector2 };
          if (!star || !star.vel) continue;

          if (star.position.x < -75) star.position.x = 75;
          if (star.position.x > 75) star.position.x = -75;
          if (star.position.z < -75) star.position.z = 75;
          if (star.position.z > 75) star.position.z = -75;

          star.position.x += star.vel.x;
          star.position.z += star.vel.y;
          const ratio = noise.noise3D(star.position.x * 0.03, star.position.z * 0.03, 0);
          star.position.y = ratio * 10 + 0.3;

          const light = localStarsLights.children[i] as THREE.PointLight;
          if (light) {
             light.position.copy(star.position);
             light.position.y += 0.5;
          }
        }
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (currentMount && rendererRef.current && cameraRef.current) {
        const ww = currentMount.clientWidth;
        const wh = currentMount.clientHeight;
        if (wh > 0) {
            rendererRef.current.setSize(ww, wh);
            cameraRef.current.aspect = ww / wh;
            cameraRef.current.updateProjectionMatrix();
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentMount);

    return () => {
      resizeObserver.unobserve(currentMount);
      if (rendererRef.current && rendererRef.current.domElement.parentNode === currentMount) { // Check if still child
        currentMount.removeChild(rendererRef.current.domElement);
      }
      cleanupScene();
    };
  }, [cleanupScene]); // Added cleanupScene to dependency array

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }} />;
};

export default ThreeScene;

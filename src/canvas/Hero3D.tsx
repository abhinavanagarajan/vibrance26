import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Hero3D = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 8;
            meshRef.current.rotation.y = Math.sin(t / 4) / 8;
            meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={meshRef} position={[0, 0, -2]} scale={[1.5, 1.5, 1.5]}>
                    <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                    <meshPhysicalMaterial
                        color="#0a0a0a"
                        emissive="#bc13fe"
                        emissiveIntensity={0.5}
                        roughness={0.1}
                        metalness={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        wireframe={true}
                    />
                </mesh>
            </Float>

            {/* Background particles or fog could go here */}
            <fog attach="fog" args={['#0a0a0a', 5, 20]} />
        </group>
    );
};

export default Hero3D;

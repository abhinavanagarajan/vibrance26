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
        <>
        </>
    );
};

export default Hero3D;

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function PearlEarring() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(-5, 1, 0);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/blenderFile/PearlEarring-v1.glb",
      (glb) => {
        scene.add(glb.scene);
      },
      undefined,
      (error) => {
        console.error("GLTF loading error:", error);
      }
    );

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas id="experience-canvas" ref={canvasRef} />;
}


/*
import {useEffect, useRef} from "react";

import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
//textureLoader() defeat
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function PearlEarring(){
  //const canvasRef = useRef();
  useEffect(() => {
  const canvas = document.querySelector("#experience-canvas");
  //const canvas = canvasRef.current;
  if (!canvas) return;
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );
  camera.position.set(-5, 1, 0);// adjust depending on model size

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  /*
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-2, 1, 0); // x, y, z
  scene.add(dirLight);
  

  const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

  //loader
  const dracoLoader = new DRACOLoader();

  //specify path to a folder containing WASM/JS decoding libraries
  dracoLoader.setDecoderPath('/draco/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(
	"/blenderFile/PearlEarring-v1.glb",
	function(glb){
		
		scene.add(glb.scene);
	},
	  undefined,
	  function(error){
		console.error(error);
	  }
  );

  window.addEventListener("resize", () => {
  //find new width & height
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    
  
  //update size & ratio
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  
  const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  };
  animate();


}, []);
  

  return null;
  //<h1 color="white" >Test</h1>;
}

*/
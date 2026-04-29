import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


//Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 100 );


//Lighting
const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 10);
directionalLight.position.set(0, 40, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 2);
scene.add(ambientLight);

//Canvas and Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

//Camera Properties
camera.position.set(5, 2, 5);
camera.lookAt(0, 0, 0); // look at center


//Porsche Model
let model;
const gltfLoader = new GLTFLoader();
const url = './Assets/scene.gltf';
gltfLoader.load(
  url,
  (gltf) => {
  model = gltf.scene;

  model.scale.set(100, 100, 100); // 👈 adjust if needed
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);

  scene.add(model);

  setupScrollAnimation();
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

//Cube properties
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

//Generating Cube
function makeInstance( geometry, color, x){
  const material = new THREE.MeshPhongMaterial({color});
  
  const cube = new THREE.Mesh( geometry, material );
  //scene.add(cube);

  cube.position.x = x;

  return cube;
}

//Generating Plane
const planeGrometry = new THREE.PlaneGeometry(20,20,20,20);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x778077,
  wireframe: false
});
const plane = new THREE.Mesh(planeGrometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
//scene.add(plane);


//Calling cube function
const cubes = [
  makeInstance(geometry, 0x175be3, 0),
  makeInstance(geometry, 0x17e31e, -2),
  makeInstance(geometry, 0xe33667, 2),
];


//Render
function render( time ) {
  time *= 0.001;
  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);


function setupScrollAnimation() {
  gsap.to(model.rotation, {
    y: Math.PI * 2, // 360°
    scrollTrigger: {
      trigger: "#three-canvas",
      scroller: "body",
      markers:true,
      start: "top 0%",
      end: "top -100%",
      scrub: 0.5, // 👈 smooth scroll sync
      pin:true
    }
  });
}
import React, { Component } from 'react';
import * as THREE from 'three';
import './Map.css';

class Map extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(1,1,1);
    this.material = new THREE.MeshBasicMaterial({ color: "#0000ff" });
    this.cube = new THREE.Mesh(geometry, this.material);

    this.camera.position.z = 4;
    this.scene.add(this.cube);
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.update);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.update);
  }

  render() {
    return (
      <div className="map" ref={mount => {this.mount = mount}}></div>
    );
  }
}

export default Map;
import React, { Component } from 'react';
import * as THREE from 'three';
import mapdata from '../../data/map.json';
import './Map.css';

class Map extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 100;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    mapdata.forEach(sys => vertices.push(sys.x, sys.y, sys.z));
    geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    this.material = new THREE.PointsMaterial({ size: 1, sizeAttenuation: true, transparent: true, color: "#ff0000" });
    this.points = new THREE.Points(geometry, this.material);
    this.scene.add(this.points);

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
    this.points.rotation.x += 0.001;
    this.points.rotation.y += 0.001;
    
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
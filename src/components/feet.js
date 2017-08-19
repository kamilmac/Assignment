import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

const THREE = window.THREE || {};


class Feet extends Component {
  constructor(props) {
    super(props);
    this.canvasReady = false;
    this.mousePosition = { x: 0, y: 0 };
    this.feet = { left: null, tight: null };

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
    this.ambientLight = new THREE.AmbientLight(0x101030);
    this.directionalLight = new THREE.DirectionalLight(0xffeedd);
    this.directionalLight2 = new THREE.DirectionalLight(0xffeedd);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.y = 0.4;
    this.camera.position.x = -1.4;
    this.ambientLight.intensity = 0.008;
    this.directionalLight.position.set(0, 0, 1);
    this.directionalLight.intensity = 0.004;
    this.directionalLight2.position.set(0, 1, 0);
    this.directionalLight2.intensity = 0.004;
    this.scene.add(this.ambientLight);
    this.scene.add( this.directionalLight );
    this.scene.add(this.directionalLight2);

    this.loadFoot({
      objUrl: props.leftUrl,
      onLoaded: foot => {
        foot.rotateX( -Math.PI / 2 );
        foot.rotateZ( Math.PI / 2);
        foot.position.z = 0.06;
        this.setFootColor(foot, props.color);
        this.scene.add(foot)
        this.feet.left = foot;
      },
    });
    this.loadFoot({
      objUrl: props.rightUrl,
      onLoaded: foot => {
        foot.rotateX( -Math.PI / 2 );
        foot.rotateZ( Math.PI / 2 );
        foot.position.z = -0.06;
        this.setFootColor(foot, props.color);
        this.scene.add(foot)
        this.feet.right = foot;
      },
    });
  }

  componentDidMount() {
    this.renderCanvas();
    window.addEventListener('resize', e => this.onWindowResize(e), false);
    window.addEventListener('mousemove', e => this.onMouseMove(e), false);
  }

  componentWillReceiveProps(newProps, oldProps) {
    if ( _.isEqual( newProps.color, oldProps.color ) || !this.canvasReady ) return false;
    this.setFootColor( this.feet.left, newProps.color );
    this.setFootColor(this.feet.right, newProps.color);
  }
  
  loadFoot({ objUrl, onLoaded }) {
    new THREE.OBJLoader().load(
      objUrl,
      object => onLoaded(object)
    );
  }
  
  setFootColor(object, color) {
    object.traverse(child => {
      if (child instanceof THREE.Mesh) child.material.color.setRGB(...color);
    });
  }

  renderCanvas() {
    this.canvasRef.appendChild(this.renderer.domElement);
    this.canvasReady = true;
    this.animate();
  }

  animate = () => {
    window.requestAnimationFrame(this.animate);
    
    this.camera.position.z += this.mousePosition.x * 0.01;
    if (this.camera.position.z > 0.5) {
      this.camera.position.z = 0.5;
    } else if (this.camera.position.z < -0.5) {
      this.camera.position.z = -0.5;
    }

    this.camera.position.y -= this.mousePosition.y * 0.01;
    if (this.camera.position.y > 0.5) {
      this.camera.position.y = 0.5;
    } else if (this.camera.position.y < -0.5) {
      this.camera.position.y = -0.5;
    }

    this.camera.lookAt(new THREE.Vector3(-0.1, 0.04, 0));
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize( e ) {
    if (!this.canvasReady) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove = e => {
    this.mousePosition.x = (e.clientX - window.innerWidth/2) / window.innerWidth * 4;
    this.mousePosition.y = (e.clientY - window.innerHeight/2) / window.innerHeight * 4 - 0.7;
  }

  render = () => <div ref={ref => { this.canvasRef = ref }} />;
}


Feet.propTypes = {
  leftUrl: PropTypes.string.isRequired,
  rightUrl: PropTypes.string.isRequired,
  color: PropTypes.arrayOf( PropTypes.number),
};

Feet.defaultProps = {
  color: [0, 0, 0],
};

export default Feet;

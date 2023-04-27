import { Scene } from '~/glxp/abstract/scene'
import { Skybox } from '../entities/skybox'
import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PointLight,
  Color,
} from 'three'
import { gsap } from 'gsap'

const AMPLITUDE = 2

export class BallScene extends Scene {
  load() {
    // position camera
    this.camera.position.z = 5
    this.camera.lookAt(0, 1, 0)

    // skybox
    this.skybox = new Skybox()
    this.skybox.material.color = new Color(0x00ff00)
    this.scene.add(this.skybox.mesh)

    // entities
    this.mesh = new Mesh(new SphereGeometry(0.5), new MeshStandardMaterial())
    this.scene.add(this.mesh)

    // lights
    this.ambient = new AmbientLight(0x404040)
    this.scene.add(this.ambient)

    this.point = new PointLight()
    this.point.position.x = -5
    this.point.position.z = 5
    this.scene.add(this.point)

    // timeline
    this.timeline = gsap
      .timeline({ repeat: -1 })
      .to(this.mesh.position, {
        y: AMPLITUDE,
        ease: 'power2.out',
        duration: 1,
      })
      .to(this.mesh.position, {
        y: 0,
        ease: 'power2.in',
        duration: 1,
      })

    // call parent class load
    super.load()
  }
}

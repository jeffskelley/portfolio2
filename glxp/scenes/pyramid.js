import { Scene } from '~/glxp/abstract/scene'
import { Skybox } from '~/glxp/entities/skybox'
import {
  TetrahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PointLight,
  Color,
} from 'three'
import { gsap } from 'gsap'

const TOTAL_ROTATION = Math.PI * 2

export class PyramidScene extends Scene {
  load() {
    // position camera
    this.camera.position.z = 5
    this.camera.lookAt(0, 0, 0)

    // skybox
    this.skybox = new Skybox()
    this.skybox.material.color = new Color(0x0000ff)
    this.scene.add(this.skybox.mesh)

    // entities
    this.mesh = new Mesh(new TetrahedronGeometry(), new MeshStandardMaterial())
    this.scene.add(this.mesh)

    // lights
    this.ambient = new AmbientLight(0x404040)
    this.scene.add(this.ambient)

    this.point = new PointLight()
    this.point.position.x = -5
    this.point.position.z = 5
    this.scene.add(this.point)

    // timeline
    this.timeline = gsap.timeline({ repeat: -1 }).to(this.mesh.rotation, {
      x: TOTAL_ROTATION,
      y: TOTAL_ROTATION,
      ease: 'linear',
      duration: 5,
    })

    // call parent class load
    super.load()
  }
}

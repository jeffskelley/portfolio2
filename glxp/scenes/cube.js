import { Scene } from '~/glxp/abstract/scene'
import { Skybox } from '~/glxp/entities/skybox'
import {
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PointLight,
  Color,
} from 'three'
import { gsap } from 'gsap'

const TOTAL_ROTATION = Math.PI * 2

export class CubeScene extends Scene {
  load() {
    // position camera
    this.camera.position.z = 3
    this.camera.lookAt(0, 0, 0)

    // skybox
    this.skybox = new Skybox()
    this.skybox.material.color = new Color(0xff0000)
    this.scene.add(this.skybox.mesh)

    // entities
    this.mesh = new Mesh(
      new BoxGeometry(),
      new MeshStandardMaterial({ color: 0xffffff })
    )
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

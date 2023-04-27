/**
 * incomplete
 */

import { Scene } from '~/glxp/abstract/scene'
import {
  OrthographicCamera,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
} from 'three'

import { GlobalEmitter } from '~/utils/GlobalEmitter'

export class UIScene extends Scene {
  load() {
    this.camera = new OrthographicCamera(0, 1, 1, 0)
    this.camera.position.x = 0.5
    this.camera.position.y = 0.5
    this.camera.lookAt(0.5, 0.5, 0)
    this.resize()

    this.activeEntities = {}
    GlobalEmitter.on('pe:activate', this.createEntity.bind(this))
    GlobalEmitter.on('pe:deactivate', this.destroyEntity.bind(this))

    // call parent class load
    super.load()
  }

  createEntity(slug) {
    const mesh = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({ color: 0xffffff })
    )
    GlobalEmitter.on(`pe:update:${slug}`, this.updateEntity.bind(this, slug))
    mesh.position.x = -99
    mesh.position.y = -99
    mesh.position.z = -1
    this.activeEntities[slug] = mesh
    this.scene.add(mesh)
  }

  updateEntity(slug, { top, left, width, height }) {
    const entity = this.activeEntities[slug]
    const ww = window.innerWidth
    const wh = window.innerHeight

    const widthRel = width / ww
    const heightRel = height / wh

    const topRel = top / wh + widthRel / 2
    const leftRel = left / ww + heightRel / 2

    console.log(topRel, leftRel, widthRel, heightRel)

    entity.position.set(leftRel, 1 - topRel, -1)
    entity.scale.set(widthRel, heightRel, 1)
  }

  destroyEntity(slug) {
    this.scene.remove(this.activeEntities[slug])
    delete this.activeEntities[slug]
    GlobalEmitter.off(`pe:update:${slug}`, this.updateEntity.bind(this))
  }
}

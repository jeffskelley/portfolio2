import { Mesh, BoxGeometry, MeshBasicMaterial, BackSide } from 'three'

export class Skybox {
  constructor() {
    this.geometry = new BoxGeometry(100, 100, 100)
    this.material = new MeshBasicMaterial({ side: BackSide })
    this.mesh = new Mesh(this.geometry, this.material)
  }
}

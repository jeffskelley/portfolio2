export function getViewSizeAtDepth(camera, depth = 0) {
  const fovInRadians = (camera.fov * Math.PI) / 180
  const height = Math.abs(
    (camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
  )
  return { width: height * camera.aspect, height }
}

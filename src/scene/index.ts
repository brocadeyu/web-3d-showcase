// async function loadScenes() {
//   const modules = import.meta.glob('./scenes/three/*.ts')
//   const scenes: Record<string, any> = {}

//   for (const path in modules) {
//     const mod = await modules[path]()
//     const className = Object.keys(mod)[0]
//     scenes[className] = mod[className]
//   }

//   return scenes
// }
async function loadCesiumScenes() {
  const modules = import.meta.glob('./scenes/cesium/*.ts', { eager: true })
  const moduleFunctions: Record<string, Function> = {}

  for (const path in modules) {
    const mod = modules[path] as { default?: Function; name?: string }
    if (mod.default) {
      const moduleName = (mod as any).name || path
      moduleFunctions[moduleName] = mod.default
    }
  }

  return moduleFunctions
}
function generateHemisphere(radius, latSegments, lonSegments, phaseOffset = 0) {
  const positions = []
  const indices = []
  const lines = []

  for (let lat = 0; lat <= latSegments; lat++) {
    const theta = (lat * Math.PI) / (2 * latSegments) // 0 to Pi/2 for half sphere
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    for (let lon = 0; lon <= lonSegments; lon++) {
      const phi = (lon * 2 * Math.PI) / lonSegments
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi)

      const x = radius * cosPhi * sinTheta
      const z = radius * sinPhi * sinTheta

      // Calculate radial distance from center (projected on the xz-plane)
      const distanceFromCenter = Math.sqrt(x * x + z * z)

      // Modify the y coordinate to follow a sine wave pattern
      // The wave's frequency and phase can be adjusted by the radius and phaseOffset
      const y = -Math.sin((distanceFromCenter / radius) * Math.PI + phaseOffset) * cosTheta * radius

      positions.push(x, y, z)
    }
  }

  for (let lat = 0; lat < latSegments; lat++) {
    for (let lon = 0; lon < lonSegments; lon++) {
      const first = lat * (lonSegments + 1) + lon
      const second = first + lonSegments + 1

      indices.push(first, second, first + 1)
      indices.push(second, second + 1, first + 1)

      // Add line indices for wireframe
      lines.push(first, first + 1)
      lines.push(first, second)
      lines.push(first + 1, second + 1)
    }
  }

  return { positions, indices, lines }
}
export { loadCesiumScenes, generateHemisphere }

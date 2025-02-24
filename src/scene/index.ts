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
export { loadCesiumScenes }

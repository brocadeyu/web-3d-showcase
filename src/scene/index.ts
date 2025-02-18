export { BaseScene } from './core/BaseScene'
async function loadScenes() {
  const modules = import.meta.glob('./scenes/*.ts')
  const scenes: Record<string, any> = {}

  for (const path in modules) {
    const mod = await modules[path]()
    const className = Object.keys(mod)[0]
    scenes[className] = mod[className]
  }

  return scenes
}
export { loadScenes }

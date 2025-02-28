export const name = 'hello'
export const load = () => {
  earth.camera.flyTo({
    duration: 2,
    // easingFunction: GeoVis.EasingFunction.LINEAR_NONE,
    destination: {
      x: -6841491.767242003,
      y: 23859117.20649843,
      z: 12939394.026670447,
    }, //左下经度，左下纬度，右上经度，右上纬度
    orientation: {
      heading: 6.283185307179586, // 偏航角（左右）
      pitch: -1.568977530222552, // 俯仰角（上下）
      roll: 0, // 翻滚角，一般设置为 0
    },
  })
}
const unload = () => {}

export { unload }

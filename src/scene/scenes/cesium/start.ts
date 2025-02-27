export const name = 'start'
export const load = () => {
  earth.camera.flyTo({
    destination: GeoVis.Cartesian3.fromDegrees(-122.19, 46.25, 5000.0),
    orientation: {
      direction: new GeoVis.Cartesian3(
        -0.04231243104240401,
        -0.20123236049443421,
        -0.97862924300734,
      ),
      up: new GeoVis.Cartesian3(-0.47934589305293746, -0.8553216253114552, 0.1966022179118339),
    },
  })
}
const unload = () => {
  console.log('卸载')
}

export { unload }

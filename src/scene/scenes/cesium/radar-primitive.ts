export const name = '电磁包络'
const a = 'test'
export default function () {
  console.log('电磁包络执行', a)
}

// // @ts-nocheck
// import * as Cesium from 'cesium'
// // 自定义Primitive， 实现Primitive接口
// export class CustomPrimitive {
//   constructor(options) {
//     this.show = true
//     this.commandType = options.commandType
//     this.modelMatrix = options.modelMatrix || Cesium.Matrix4.IDENTITY
//     this.geometry = options.geometry
//     this.attributeLocations = options.attributeLocations
//     this.primitiveType = options.primitiveType
//     this.uniformMap = options.uniformMap
//     this.vertexShaderSource = options.vertexShaderSource
//     this.fragmentShaderSource = options.fragmentShaderSource
//     this.rawRenderState = options.rawRenderState
//     this.framebuffer = options.framebuffer
//     this.outputTexture = options.outputTexture
//     this.autoClear = Cesium.defaultValue(options.autoClear, false)
//     this.preExecute = options.preExecute
//     this.commandToExecute = undefined
//     this.clearCommand = undefined
//     this.geometryNeedsUpdate = false
//     if (this.autoClear) {
//       this.clearCommand = new Cesium.ClearCommand({
//         color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
//         depth: 1.0,
//         framebuffer: this.framebuffer,
//         pass: Cesium.Pass.OPAQUE,
//       })
//     }
//   }
//   /**
//    * 更新几何体的方法
//    * @param {Cesium.Geometry} newGeometry - 新的几何体
//    */
//   updateGeometry(newGeometry) {
//     this.geometry = newGeometry
//     this.attributeLocations = Cesium.GeometryPipeline.createAttributeLocations(newGeometry)
//     this.geometryNeedsUpdate = true
//   }

//   createCommand(context) {
//     switch (this.commandType) {
//       case 'Draw': {
//         const vertexArray = Cesium.VertexArray.fromGeometry({
//           context: context,
//           geometry: this.geometry,
//           attributeLocations: this.attributeLocations,
//           bufferUsage: Cesium.BufferUsage.STATIC_DRAW,
//         })

//         const shaderProgram = Cesium.ShaderProgram.fromCache({
//           context: context,
//           attributeLocations: this.attributeLocations,
//           vertexShaderSource: this.vertexShaderSource,
//           fragmentShaderSource: this.fragmentShaderSource,
//         })

//         const renderState = Cesium.RenderState.fromCache(this.rawRenderState)
//         return new Cesium.DrawCommand({
//           owner: this,
//           vertexArray: vertexArray,
//           primitiveType: this.primitiveType,
//           uniformMap: this.uniformMap,
//           modelMatrix: this.modelMatrix,
//           shaderProgram: shaderProgram,
//           framebuffer: this.framebuffer,
//           renderState: renderState,
//           pass: Cesium.Pass.TRANSLUCENT,
//         })
//       }
//       case 'Compute': {
//         return new Cesium.ComputeCommand({
//           owner: this,
//           fragmentShaderSource: this.fragmentShaderSource,
//           uniformMap: this.uniformMap,
//           outputTexture: this.outputTexture,
//           persists: true,
//         })
//       }
//     }
//   }

//   setGeometry(context, geometry) {
//     this.geometry = geometry
//     const vertexArray = Cesium.VertexArray.fromGeometry({
//       context: context,
//       geometry: this.geometry,
//       attributeLocations: this.attributeLocations,
//       bufferUsage: Cesium.BufferUsage.STATIC_DRAW,
//     })
//     this.commandToExecute.vertexArray = vertexArray
//   }

//   update(frameState) {
//     if (!this.show) {
//       return
//     }
//     if (this.geometryNeedsUpdate) {
//       this.commandToExecute = this.createCommand(frameState.context)
//       this.geometryNeedsUpdate = false
//     }

//     if (!Cesium.defined(this.commandToExecute)) {
//       this.commandToExecute = this.createCommand(frameState.context)
//     }

//     if (Cesium.defined(this.preExecute)) {
//       this.preExecute()
//     }

//     if (Cesium.defined(this.clearCommand)) {
//       frameState.commandList.push(this.clearCommand)
//     }

//     frameState.commandList.push(this.commandToExecute)
//   }

//   isDestroyed() {
//     return false
//   }

//   destroy() {
//     if (Cesium.defined(this.commandToExecute)) {
//       this.commandToExecute.shaderProgram =
//         this.commandToExecute.shaderProgram && this.commandToExecute.shaderProgram.destroy()
//     }
//     return Cesium.destroyObject(this)
//   }
// }

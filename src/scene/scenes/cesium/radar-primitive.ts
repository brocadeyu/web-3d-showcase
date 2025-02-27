export const name = 'customPrimitive'
const a = 'test'
import { generateHemisphere } from '@/scene'
import { GUI } from 'dat.gui'
export default function () {
  console.log('电磁包络执行', a)
  const radius = 500000
  const latSegments = 20
  const lonSegments = 20
  const { positions, indices, lines } = generateHemisphere(radius, latSegments, lonSegments)
  // 将半球顶点和索引数据转换为GeoVis几何体
  const hemisphereGeometry = new GeoVis.Geometry({
    attributes: {
      position: new GeoVis.GeometryAttribute({
        componentDatatype: GeoVis.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: new Float32Array(positions),
      }),
    },
    indices: new Uint16Array(indices), // 使用线框索引
    primitiveType: GeoVis.PrimitiveType.TRIANGLES, // 设置为线框绘制
    boundingSphere: GeoVis.BoundingSphere.fromVertices(positions),
  })

  const hemisphereGeometry_ = new GeoVis.Geometry({
    attributes: {
      position: new GeoVis.GeometryAttribute({
        componentDatatype: GeoVis.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: new Float32Array(positions),
      }),
    },
    indices: new Uint16Array(lines), // 使用线框索引
    primitiveType: GeoVis.PrimitiveType.LINES, // 设置为线框绘制
    boundingSphere: GeoVis.BoundingSphere.fromVertices(positions),
  })

  // 使用自定义的半球几何体创建并添加到场景中
  const origin = GeoVis.Cartesian3.fromDegrees(120, 40, 500000)
  const modelMatrix = GeoVis.Transforms.eastNorthUpToFixedFrame(origin)

  const attributeLocations = GeoVis.GeometryPipeline.createAttributeLocations(hemisphereGeometry)

  const vs = `

      attribute vec3 position;
      void main() {
      mat4 rotationMatrix = mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 1.0
  );
  vec4 rotatedPosition = rotationMatrix * vec4(position, 1.0);
  gl_Position = czm_modelViewProjection * rotatedPosition;
          //gl_Position = czm_modelViewProjection * vec4(position, 1.0);
      }
  `

  const fsFace = `
      uniform vec3 color;
      uniform float opacity;
      void main() {
          gl_FragColor = vec4(color, opacity);
      }
  `
  const fs = `
  uniform vec3 color;
      uniform float opacity;
  void main() {
      gl_FragColor = vec4(color, opacity);
  }
  `

  const rawRenderState = GeoVis.RenderState.fromCache({
    depthTest: {
      enabled: true,
    },
    cull: {
      enabled: true,
      face: GeoVis.CullFace.BACK,
    },
    blending: GeoVis.BlendingState.ALPHA_BLEND,
  })

  const rawRenderStateLine = GeoVis.RenderState.fromCache({
    depthTest: {
      enabled: true,
    },
    cull: {
      enabled: true,
      face: GeoVis.CullFace.BACK,
    },
    blending: GeoVis.BlendingState.ALPHA_BLEND,
    depthMask: true,
  })
  const guiConfig = {
    radius: 500000,
    latSegments: 20,
    lonSegments: 20,
    speed: 1,
    colorShape: '#FF0000',
    opacityShape: 0.5,
    colorLine: '#FFFF00',
    opacityLine: 1.0,
  }

  const options = {
    commandType: 'Draw',
    geometry: hemisphereGeometry,
    primitiveType: GeoVis.PrimitiveType.TRIANGLES,
    attributeLocations,
    uniformMap: {
      color() {
        return GeoVis.Color.fromCssColorString(guiConfig.colorShape)
      },
      opacity() {
        return guiConfig.opacityShape
      },
    },
    vertexShaderSource: vs,
    fragmentShaderSource: fsFace,
    framebuffer: null,
    autoClear: false,
    modelMatrix,
    rawRenderState,
  }

  const options_ = {
    commandType: 'Draw',
    geometry: hemisphereGeometry_,
    primitiveType: GeoVis.PrimitiveType.LINES, // 设置为线框绘制
    attributeLocations,
    uniformMap: {
      color() {
        return GeoVis.Color.fromCssColorString(guiConfig.colorLine)
      },
      opacity() {
        return guiConfig.opacityLine
      },
    },
    vertexShaderSource: vs,
    fragmentShaderSource: fs,
    framebuffer: null,
    autoClear: false,
    modelMatrix,
    rawRenderState: rawRenderStateLine,
  }

  const myPrimitive = new CustomPrimitive(options)
  const myPrimitive_ = new CustomPrimitive(options_)
  earth.scene.primitives.add(myPrimitive)
  earth.scene.primitives.add(myPrimitive_)
  let p = 0
  const gui = new GUI()
  gui.add(guiConfig, 'radius', 100000, 2000000)
  gui.add(guiConfig, 'latSegments', 1, 100)
  gui.add(guiConfig, 'lonSegments', 1, 100)
  gui.add(guiConfig, 'speed', 0.1, 5)
  gui.addColor(guiConfig, 'colorShape')
  gui.add(guiConfig, 'opacityShape', 0.0, 1.0)
  gui.addColor(guiConfig, 'colorLine')
  gui.add(guiConfig, 'opacityLine', 0.0, 1.0)
  earth.scene.postRender.addEventListener(() => {
    p += 0.01 * guiConfig.speed
    const { positions, indices, lines } = generateHemisphere(
      guiConfig.radius,
      Math.floor(guiConfig.latSegments),
      Math.floor(guiConfig.lonSegments),
      p,
    )
    const g = new GeoVis.Geometry({
      attributes: {
        position: new GeoVis.GeometryAttribute({
          componentDatatype: GeoVis.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: new Float32Array(positions),
        }),
      },
      indices: new Uint16Array(indices),
      primitiveType: GeoVis.PrimitiveType.TRIANGLES,
      boundingSphere: GeoVis.BoundingSphere.fromVertices(positions),
    })
    const l = new GeoVis.Geometry({
      attributes: {
        position: new GeoVis.GeometryAttribute({
          componentDatatype: GeoVis.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: new Float32Array(positions),
        }),
      },
      indices: new Uint16Array(lines),
      primitiveType: GeoVis.PrimitiveType.LINES,
      boundingSphere: GeoVis.BoundingSphere.fromVertices(positions),
    })
    myPrimitive.updateGeometry(g)
    myPrimitive_.updateGeometry(l)
  })
}

//@ts-nocheck
export class CustomPrimitive {
  constructor(options) {
    this.show = true
    this.commandType = options.commandType
    this.modelMatrix = options.modelMatrix || GeoVis.Matrix4.IDENTITY
    this.geometry = options.geometry
    this.attributeLocations = options.attributeLocations
    this.primitiveType = options.primitiveType
    this.uniformMap = options.uniformMap
    this.vertexShaderSource = options.vertexShaderSource
    this.fragmentShaderSource = options.fragmentShaderSource
    this.rawRenderState = options.rawRenderState
    this.framebuffer = options.framebuffer
    this.outputTexture = options.outputTexture
    this.autoClear = GeoVis.defaultValue(options.autoClear, false)
    this.preExecute = options.preExecute
    this.commandToExecute = undefined
    this.clearCommand = undefined
    this.geometryNeedsUpdate = false
    if (this.autoClear) {
      this.clearCommand = new GeoVis.ClearCommand({
        color: new GeoVis.Color(0.0, 0.0, 0.0, 0.0),
        depth: 1.0,
        framebuffer: this.framebuffer,
        pass: GeoVis.Pass.OPAQUE,
      })
    }
  }
  /**
   * 更新几何体的方法
   * @param {GeoVis.Geometry} newGeometry - 新的几何体
   */
  updateGeometry(newGeometry) {
    this.geometry = newGeometry
    this.attributeLocations = GeoVis.GeometryPipeline.createAttributeLocations(newGeometry)
    this.geometryNeedsUpdate = true
  }

  createCommand(context) {
    switch (this.commandType) {
      case 'Draw': {
        const vertexArray = GeoVis.VertexArray.fromGeometry({
          context: context,
          geometry: this.geometry,
          attributeLocations: this.attributeLocations,
          bufferUsage: GeoVis.BufferUsage.STATIC_DRAW,
        })

        const shaderProgram = GeoVis.ShaderProgram.fromCache({
          context: context,
          attributeLocations: this.attributeLocations,
          vertexShaderSource: this.vertexShaderSource,
          fragmentShaderSource: this.fragmentShaderSource,
        })

        const renderState = GeoVis.RenderState.fromCache(this.rawRenderState)
        return new GeoVis.DrawCommand({
          owner: this,
          vertexArray: vertexArray,
          primitiveType: this.primitiveType,
          uniformMap: this.uniformMap,
          modelMatrix: this.modelMatrix,
          shaderProgram: shaderProgram,
          framebuffer: this.framebuffer,
          renderState: renderState,
          pass: GeoVis.Pass.TRANSLUCENT,
        })
      }
      case 'Compute': {
        return new GeoVis.ComputeCommand({
          owner: this,
          fragmentShaderSource: this.fragmentShaderSource,
          uniformMap: this.uniformMap,
          outputTexture: this.outputTexture,
          persists: true,
        })
      }
    }
  }

  setGeometry(context, geometry) {
    this.geometry = geometry
    const vertexArray = GeoVis.VertexArray.fromGeometry({
      context: context,
      geometry: this.geometry,
      attributeLocations: this.attributeLocations,
      bufferUsage: GeoVis.BufferUsage.STATIC_DRAW,
    })
    this.commandToExecute.vertexArray = vertexArray
  }

  update(frameState) {
    if (!this.show) {
      return
    }
    if (this.geometryNeedsUpdate) {
      this.commandToExecute = this.createCommand(frameState.context)
      this.geometryNeedsUpdate = false
    }

    if (!GeoVis.defined(this.commandToExecute)) {
      this.commandToExecute = this.createCommand(frameState.context)
    }

    if (GeoVis.defined(this.preExecute)) {
      this.preExecute()
    }

    if (GeoVis.defined(this.clearCommand)) {
      frameState.commandList.push(this.clearCommand)
    }

    frameState.commandList.push(this.commandToExecute)
  }

  isDestroyed() {
    return false
  }

  destroy() {
    if (GeoVis.defined(this.commandToExecute)) {
      this.commandToExecute.shaderProgram =
        this.commandToExecute.shaderProgram && this.commandToExecute.shaderProgram.destroy()
    }
    return GeoVis.destroyObject(this)
  }
}

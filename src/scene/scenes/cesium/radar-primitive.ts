import { CustomPrimitive } from './custom-primitive'
import { data } from '@/scene'
export const name = '电磁'
export const load = () => {
  const lineIndices = []
  const hemisphereGeometry_ = new GeoVis.Geometry({
    attributes: {
      position: new GeoVis.GeometryAttribute({
        componentDatatype: GeoVis.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: new Float32Array(data),
      }),
    },
    // indices: new Uint16Array(lineIndices), // 使用线框索引
    primitiveType: GeoVis.PrimitiveType.LINES, // 设置为线框绘制
    boundingSphere: GeoVis.BoundingSphere.fromVertices(data),
  })

  const origin = GeoVis.Cartesian3.fromDegrees(120, 40, 100)
  const modelMatrix = GeoVis.Transforms.eastNorthUpToFixedFrame(origin)
  const attributeLocations = GeoVis.GeometryPipeline.createAttributeLocations(hemisphereGeometry_)
  const vs = `

      attribute vec3 position;
      void main() {
      mat4 rotationMatrix = mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 1.0
  );
  vec4 rotatedPosition = rotationMatrix * vec4(position, 1.0);
  gl_Position = czm_modelViewProjection * rotatedPosition;
          //gl_Position = czm_modelViewProjection * vec4(position, 1.0);
      }
  `
  const fs = `
  uniform vec3 color;
      uniform float opacity;
  void main() {
      gl_FragColor = vec4(color, opacity);
  }
  `

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

  window.myPrimitive_ = new CustomPrimitive(options_)
  earth.scene.primitives.add(window.myPrimitive_)

  setTimeout(() => {
    earth.camera.flyTo({
      duration: 2,
      // easingFunction: GeoVis.EasingFunction.LINEAR_NONE,
      destination: {
        x: -2477746.8772106036,
        y: 4308818.160565604,
        z: 4077315.740000214,
      }, //左下经度，左下纬度，右上经度，右上纬度
      orientation: {
        heading: 0.2529518061942735, // 偏航角（左右）
        pitch: -0.8762047737776797, // 俯仰角（上下）
        roll: 6.282980162176285, // 翻滚角，一般设置为 0
      },
    })
  }, 500)
}

export const unload = () => {
  earth.scene.primitives.remove(window.myPrimitive_)
  window.myPrimitive_ = null
}

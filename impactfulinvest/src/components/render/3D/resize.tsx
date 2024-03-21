import * as THREE from 'three'
import * as React from 'react'

export type ResizeProps = JSX.IntrinsicElements['group'] & {
  /** Whether to fit into dimensions (x y z axis), undefined */
  max?: [number, number, number],
  /** You can optionally pass the Box3, otherwise will be computed, undefined */
  box3?: THREE.Box3
  /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
  precise?: boolean,
  modifiy?: [boolean, boolean, boolean],
}

export const Resize = /* @__PURE__ */ React.forwardRef<THREE.Group, ResizeProps>(
  ({ children, box3, precise = true, modifiy=[true,true,true], max=[1,1,1], ...props }, fRef) => {
    const ref = React.useRef<THREE.Group>(null!)
    const outer = React.useRef<THREE.Group>(null!)
    const inner = React.useRef<THREE.Group>(null!)

    React.useLayoutEffect(() => {
      outer.current.matrixWorld.identity()
      let box = box3 || new THREE.Box3().setFromObject(inner.current, precise)
      const w = box.max.x - box.min.x
      const h = box.max.y - box.min.y
      const d = box.max.z - box.min.z

      let dimension = Math.max(
        modifiy[0] ? w / max[0] : 0, 
        modifiy[1] ? h / max[1] : 0,
        modifiy[2] ? d / max[2] : 0,
      );

      //   outer.current.scale.setScalar(1 / dimension)
      if(modifiy[0]) outer.current.scale.x = 1 / dimension;
      if(modifiy[1]) outer.current.scale.y = 1 / dimension;
      if(modifiy[2]) outer.current.scale.z = 1 / dimension;
    }, [max, modifiy, box3, precise])

    React.useImperativeHandle(fRef, () => ref.current, [])

    return (
      <group ref={ref} {...props}>
        <group ref={outer}>
          <group ref={inner}>{children}</group>
        </group>
      </group>
    )
  }
)
Resize.displayName = 'Resize';
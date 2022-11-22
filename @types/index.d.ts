declare module '*.module.css'

declare module '*.svg' {
  import React from 'react'
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { className?: any }
  >
  export default ReactComponent
}

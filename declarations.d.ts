declare module "*.png" {
    const path: string
    export default path
}

declare module "*.jpg" {
    const path: string
    export default path
}

declare module "*.jpeg" {
    const path: string
    export default path
}

declare module "*.gif" {
    const path: string
    export default path
}

declare module "*.webp" {
    const path: string
    export default path
}

declare module "*.ico" {
    const path: string
    export default path
}

declare module "*.svg" {
    import React from "react"
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>
    export default SVG
}
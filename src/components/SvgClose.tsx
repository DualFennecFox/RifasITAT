import * as React from "react"
const SvgClose = (props: React.SVGProps<SVGSVGElement>
) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        strokeWidth={0}
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M20.746 3.329a1 1 0 0 0-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 1 0-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 0 0 1.414 1.415l7.294-7.295 7.294 7.295a1 1 0 0 0 1.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 0 0 0-1.414Z"
        />
    </svg>
)
export default SvgClose

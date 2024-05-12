import gsap from "gsap"
import { useEffect } from "react"

const useGsap = (target, options) => {
    useEffect(() => {
        const animation = gsap.from(target, options);
        return() => {
            animation.kill()
        }
    }, [target, options])

    const animate = () => {
        gsap.from(target, options)
        console.log(target, options)
    };
    return animate;
}

export default useGsap
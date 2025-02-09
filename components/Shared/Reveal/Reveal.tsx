"use client"

import { motion, useAnimate, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
    children: React.ReactNode
    className?: string
    position: "right" | "bottom"
    delay?: number
}

export const fadeIn = ( position: string, delay?: number ) => {
    return {
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: 1.4,
                delay: delay ? delay : 0.5,
                ease: [0.25, 0.25, 0.25, 0.75]
            },
        },
        hidden: {
            y: position === "bottom" ? -80 : 0,
            x: position === "right" ? -80 : 0,
            opacity: 0,
            transition: {
                type: "tween",
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.25, 0.25, 0.25]
            },
        }
    }
}

export function Reveal({ children, position, delay, className }: Props) {

    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() => {
      if(isInView){
        mainControls.start("visible")
        slideControls.start("visible")
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])
    

  return (
    <div ref={ref}>
        <motion.div
            className={className}
            variants={fadeIn(position, delay)}
            initial="hidden"
            animate={mainControls}
            exit={"hidden"}
            transition={{
                delay:0.5,
                duration:0.5
            }}
        >
            { children }
        </motion.div>
    </div>
  )
}

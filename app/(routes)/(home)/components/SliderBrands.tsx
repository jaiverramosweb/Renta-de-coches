"use client"

import Image from "next/image"
import AutoPlay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { dataBrands } from "../data/SliderBrands.data"
import { Reveal } from "@/components/Shared/Reveal"


export default function SliderBrands() {
  return (
    <Reveal position="bottom" className="flex gap-x-20 justify-center mt-5 mb-10 lg:pb-20">
        <Carousel
            className="w-full max-w-6xl mx-auto"
            plugins={[
                AutoPlay({
                    delay: 2500,
                })
            ]}
        >
            <CarouselContent>
                { dataBrands.map(({ url }) => (
                    <CarouselItem key={url} className="basis-4/4 md:basis-2/4 lg:basis-1/6">
                        <Image 
                            src={`/images/brands/${url}`} 
                            alt="brand" 
                            width={90} 
                            height={90} 
                            className="object-contain aspect-[3/2]"
                        />
                    </CarouselItem>
                )) }
            </CarouselContent>
        </Carousel>
    </Reveal>
  )
}

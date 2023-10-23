import { useTenancy } from '@/components/hook/TenancyProvider';
import httpClient from '@/components/http-client/httpClient';
import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

const Slide = () => {
    const [slider, setSlider] = useState<ImgSlider[]>([])
    const tenancy = useTenancy()
    
    useEffect(() => {
      (async () => {
        try {
          const slider: any = await httpClient.post(
            "/services/app/slider/GetAllSlider",
            {
              tenancyName: tenancy?.tenancyName,
            }
          );
          setSlider(slider.result);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [tenancy]);
  
    return (
      <Box w={"100%"} bg={"#0c151d"}>

      <Box w={["100%","100%","100%","1024px"]} margin={"auto"}>
        <Slider dots={true} infinite={true} autoplay={true} autoplaySpeed={4000} slidesToScroll={1} slidesToShow={1} arrows={false}  className='home-slider'
          appendDots={(dots) => (
            <Box pos={"absolute"} top={["70%","70%","85%","85%"]} h={'10px'}>
              {dots}
            </Box>
          )}>
          {slider.map((item, i) => (
            <Flex key={i} bgColor={"#0c151d"} outline={"none"}>
              <Image w={"100%"} maxH={"260px"} src={item.imageUrl} objectFit={"contain"} alt={item.title} />
            </Flex>
          ))}
        </Slider>
      </Box>
      </Box>
    )
}

export default Slide
type ImgSlider = {
    category: string,
    displayNumber: number,
    id: number,
    imageUrl: string,
    imageUrlMobile: string,
    title: string
  }
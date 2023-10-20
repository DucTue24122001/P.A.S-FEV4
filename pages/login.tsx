import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import bg_login from "../public/images/bg_login.png";
import Slider from "react-slick";
import king1 from "../public/images/king1.png";
import king2 from "../public/images/king2.png";
import king3 from "../public/images/king3.png";
import king4 from "../public/images/king4.png";

const Login = () => {
  return (
    <Box
      w={"100%"}
      h={"100vh"}
      bgImage={bg_login.src}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <Box pos={"relative"}>
        <Slider
        className='home-slider'
          dots={true}
          infinite={true}
          slidesToScroll={1}
          slidesToShow={1}
          arrows={false}
          autoplay={true}
          autoplaySpeed={3000}
          appendDots={(dots) => (
            <Box pos={"absolute"} top={["70%","70%","85%","90%"]} h={'10px'}>
              {dots}
            </Box>
          )}
        >
          {slideDummy.map((item, i) => (
            <Flex key={i}>
              <Image
                w={"100%"}
                h={"600px"}
                src={item.img}
                objectFit={"contain"}
                alt="gift"
              />
            </Flex>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Login;
const slideDummy = [
  {
    img: king1.src,
  },
  {
    img: king2.src,
  },
  {
    img: king3.src,
  },
  {
    img: king4.src,
  },
];

import { colors } from '@/components/chakra-ui/colors'
import { useTenancy } from '@/components/hook/TenancyProvider'
import httpClient from '@/components/http-client/httpClient'
import { AnnouncementType } from '@/util/type'
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'

const Marque = () => {
    const [announce, setAnnounce] = useState<AnnouncementType[]>([])
    const tenancy = useTenancy()
  
    useEffect(() => {
      (async () => {
        try {
          const announce: any = await httpClient.post(
            "/services/app/announcement/ListAnnouncementUser",
            {
              tenancyName: tenancy?.tenancyName,
            }
          );
          setAnnounce(announce.result);
        } catch (err) {
          console.log(err);
        }
      })();
    }, [tenancy])
    
  
    return (
      <Flex h={"30px"} lineHeight={"30px"} w={"100%"} p={"0 10px"}>
        {announce.length > 0 && <Marquee speed={40} style={{color:"#f5ffe1", fontSize:"13px"}}>
          {announce.map((item, i) => (
            <Text key={i} ml={"40px"} color={colors.global.primary}>{item.title}: {item.body}</Text>
          ))}
        </Marquee>}
      </Flex>
    );
}

export default Marque
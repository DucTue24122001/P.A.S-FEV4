import { Select } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../chakra-ui/colors'

const DefaultSelect = ({children, ...props}: any) => {
  return (
    <Select _focusVisible={{outline: "none"}} h={["50px","50px","35px","35px"]}
      border={[`1px solid ${colors.default.white}`,`1px solid ${colors.default.white}`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]} 
      _focus={{border: [`1px solid ${colors.default.white}`,`1px solid ${colors.default.white}`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]}}
      bgColor={[colors.default.bg,colors.default.bg,colors.default.white,colors.default.white]}
      {...props}
      >
      {children}
    </Select>
  )
}

export default DefaultSelect
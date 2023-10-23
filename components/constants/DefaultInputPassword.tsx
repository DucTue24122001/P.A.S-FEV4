import { InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import { AiFillEye } from 'react-icons/ai'
import { DefaultInput } from './DefaultInput'

const DefaultInputPassword = ({...props}: any) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const showPasswordHandle = () => {
    setIsShowPassword(state => !state)
  }

  return (
    <InputGroup w={props.w} >
                <DefaultInput placeholder={props.placeholder} type={isShowPassword ? "text" : "password"} {...props}/>
                <InputRightElement h={["50px","50px","35px","35px"]}
                  // eslint-disable-next-line react/no-children-prop
                  children={!isShowPassword ? 
                    <BsFillEyeSlashFill
                      onClick={showPasswordHandle}
                      cursor={"pointer"}
                      style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "20px" }}
                    /> : <AiFillEye cursor={"pointer"}
                      onClick={showPasswordHandle}
                      style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "20px" }}/>
                  }
                />
    </InputGroup>
  )
}

export default DefaultInputPassword
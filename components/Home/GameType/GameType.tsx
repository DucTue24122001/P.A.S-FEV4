import { ListCategory } from '@/components/constants/enum'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import GameLive from './GameLive'
import GameSelect from './GameSelect'

const GameType = () => {
  const {gameType} = useSelector((state:RootState) => state.client)
  const checkGameType = () => {
    switch (gameType) {
      case ListCategory.LIVEARENA:
        return true
      case ListCategory.LIVE:
        return true
      case ListCategory.SPORTS:
        return true
      case ListCategory.FH:
        return false
      case ListCategory.SLOT:
        return false
      case ListCategory.LOTTERY:
        return true
      case ListCategory.ARCADE:
        return false
      case ListCategory.RNGTABLE:
        return false
      default:
        return null
    }
  }
  
  return (
    <>
      {checkGameType() !== false ? <GameLive /> : <GameSelect />  }
    </>
  )
}

export default GameType
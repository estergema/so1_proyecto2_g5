import React from 'react'
import { AppRouter } from './router/AppRouter'
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es')
export const ChatApp = () => {
  return (
    
            <AppRouter />
  )
}

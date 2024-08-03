'use client'
import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function NotificationsComponent() {
  const selector = useSelector((state: RootState) => state?.me)
  return selector?.isAdmin && (
    <div>NotificationsComponent</div>
  )
}

export default NotificationsComponent
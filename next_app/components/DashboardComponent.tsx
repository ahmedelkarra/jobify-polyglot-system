'use client'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

function DashboardComponent() {
  const selector = useSelector((state: RootState) => state?.me)
  return selector.username && (
    <div>DashboardComponent</div>
  )
}

export default DashboardComponent
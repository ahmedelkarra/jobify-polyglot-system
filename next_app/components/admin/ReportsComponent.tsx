'use client'
import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function ReportsComponent() {
  const selector = useSelector((state: RootState) => state?.me)
  return selector?.isAdmin && (
    <div>ReportsComponent</div>
  )
}

export default ReportsComponent
'use client'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

function JobMangementComponent() {
  const selector = useSelector((state: RootState) => state?.me)
  return selector?.isAdmin && (
    <div>JobMangementComponent</div>
  )
}

export default JobMangementComponent
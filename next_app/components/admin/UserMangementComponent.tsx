'use client'
import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function UserMangementComponent() {
  const selector = useSelector((state: RootState) => state?.me)
  return selector?.isAdmin && (
    <div>UserMangementComponent</div>
  )
}

export default UserMangementComponent
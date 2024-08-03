'use client'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

function CompanyManagementComponent() {
  const selector = useSelector((state: RootState) => state?.me)
  return selector?.isAdmin && (
    <div>CompanyManagementComponent</div>
  )
}

export default CompanyManagementComponent
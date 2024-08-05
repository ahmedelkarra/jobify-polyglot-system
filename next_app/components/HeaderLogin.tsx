import Link from 'next/link'
import React from 'react'

function HeaderLogin() {
    return (
        <div className='flex justify-center items-center my-10 gap-4'>
            <Link href={'/login'} className='bg-blue-400 p-1 w-[100px] text-center rounded-lg text-white'>User</Link>
            <Link href={'/login/company'} className='bg-blue-400 p-1 w-[100px] text-center rounded-lg text-white'>Company</Link>
        </div>
    )
}

export default HeaderLogin
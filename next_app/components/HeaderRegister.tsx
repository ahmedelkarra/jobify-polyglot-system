import Link from 'next/link'
import React from 'react'

function HeaderRegister() {
    return (
        <div className='flex justify-center items-center my-10 gap-4'>
            <Link href={'/register'} className='bg-blue-400 p-1 w-[100px] text-center rounded-lg text-white'>User</Link>
            <Link href={'/register/company'} className='bg-blue-400 p-1 w-[100px] text-center rounded-lg text-white'>Company</Link>
        </div>
    )
}

export default HeaderRegister
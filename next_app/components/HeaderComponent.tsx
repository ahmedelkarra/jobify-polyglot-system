'use client'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { axiosForm } from '@/utils/axiosForm'
import { changeStatus } from '@/redux/statusSlice'

function HeaderComponent() {
    const selectorMe = useSelector((state: RootState) => state?.me)
    const selectorComapny = useSelector((state: RootState) => state?.company)
    const dispatch = useDispatch()
    console.log(selectorMe)
    console.log(selectorComapny)
    const handleClick = () => {
        const userToken = localStorage.getItem('user_token');
        const companyToken = localStorage.getItem('company_token');
        if (userToken) {
            axiosForm.get('/me/logout/', { headers: { Authorization: `${userToken}` } })
                .then((e) => {
                    const data = e.data as { message: string }
                    localStorage.removeItem('user_token')
                    console.log(data.message)
                    dispatch(changeStatus(true));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (companyToken) {
            localStorage.removeItem('company_token')
            dispatch(changeStatus(true));
        }
    }
    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-blue-600" href="/">
                            <span className="sr-only">Home</span>
                            <img className="h-28" src={logo?.src} />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home</Link>
                                </li>
                                {(selectorMe?.username || selectorComapny?.username) && <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/dashboard"> Dashboard</Link>
                                </li>}
                                {(selectorMe?.username || selectorComapny?.username) && <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/profile"> Profile</Link>
                                </li>}
                                {(selectorMe?.username || selectorComapny?.username) && <li>
                                    <button className="text-gray-500 transition hover:text-gray-500/75" onClick={handleClick}> Logout</button>
                                </li>}
                                {selectorMe?.isAdmin && <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/admin/user-management"> Admin</Link>
                                </li>}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {!(selectorMe?.username || selectorComapny?.username) && <div className="sm:flex sm:gap-4">
                            <Link
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                href="/login"
                            >
                                Login
                            </Link>

                            <div className="hidden sm:flex">
                                <Link
                                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                                    href="register"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>}

                        {!(selectorMe?.username || selectorComapny?.username) && <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent
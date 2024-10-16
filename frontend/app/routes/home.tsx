import { Outlet } from '@remix-run/react'
import React from 'react'

const Home = () => {
  return (
    <>
    <div>Headerはここに置く</div>
    <Outlet />
    </>
  )
}

export default Home
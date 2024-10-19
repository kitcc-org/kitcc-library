import { Outlet } from '@remix-run/react'

const Home = () => {
  return (
    <>
    <div>Headerはここに置く</div>
    <Outlet />
    </>
  )
}

export default Home
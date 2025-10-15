import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <>
    
    <main className="p-9">
      <Outlet />
    </main>
    </>
  )
}
export default AuthLayout
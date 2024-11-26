import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Navigation from "./components/Navigation"

const Layout = () => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <Navigation />
      <main className="container mx-auto p-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
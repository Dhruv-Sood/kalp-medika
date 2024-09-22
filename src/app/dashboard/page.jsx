"use client"

import Footer from "@/components/Footer"
import { MedicineDashboardJsx } from "@/components/medicine-dashboard"
import Navbar from "@/components/Navbar"

const page = () => {
  return (
    <div>
        <Navbar />
        <MedicineDashboardJsx />
        <Footer />
    </div>
  )
}
export default page
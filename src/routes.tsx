import { Routes, Route } from "react-router-dom"
import { Home } from "./pages"

const AppRouter = () => (
  <Routes>
    <Route path="*" element={<div>404 Error</div>} />
    <Route path="/" element={<Home />} />
  </Routes>
)

export default AppRouter

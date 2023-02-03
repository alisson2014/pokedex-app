import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
)

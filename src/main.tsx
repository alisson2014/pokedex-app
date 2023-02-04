import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes"
import { ThemeProvider } from "styled-components"
import { ResetCss } from "./theme/globalStyles"
import { dark } from "./theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={dark()}>
        <ResetCss />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
)

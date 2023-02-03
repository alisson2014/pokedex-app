import { Outlet, useParams } from "react-router-dom"

const HomePage = () => {
  const { id } = useParams()

  return (
    <div>
      Olá
      {id}
      <Outlet />
    </div>
  )
}

export default HomePage

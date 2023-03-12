import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRouteElements'

function App() {
  const element = useRouteElements()
  return (
    <div>
      {element}
      <ToastContainer />
    </div>
  )
}

export default App

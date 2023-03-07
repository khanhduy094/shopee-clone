import './App.css'
import useRouteElements from './useRouteElements'

function App() {
  const element = useRouteElements()
  return <div>{element}</div>
}

export default App

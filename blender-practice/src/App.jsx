import { Routes, Route } from 'react-router-dom'
import {Homepage} from './pages/homepage.jsx'
import {PearlEarring} from './pages/pearlEarring.jsx'

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="pearlEarring" element={<PearlEarring />} />
    </Routes>
  )
}

export default App


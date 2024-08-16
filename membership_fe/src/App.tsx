import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import DetailContent from "./pages/DetailContent"
import articles from "./data/articles.json"
import videos from "./data/videos.json"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home articles={articles} videos={videos} />} />
        <Route path="/detail/:id" element={<DetailContent articles={articles} videos={videos}  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
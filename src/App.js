import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import FileList from "./pages/fileList/FileList";
import New from "./pages/new/New";
import NewFile from "./pages/newFile/NewFile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path="new/:userId"
                element={
                  <RequireAuth>
                    <New title="Editar usuario" />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New title="Añadir nuevo usuario" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="files">
              <Route
                index
                element={
                  <RequireAuth>
                    <FileList />
                  </RequireAuth>
                }
              />
              <Route
                path="newFile/:fileId"
                element={
                  <RequireAuth>
                    <NewFile title="Editar expediente" />
                  </RequireAuth>
                }
              />
              <Route
                path="newFile"
                element={
                  <RequireAuth>
                    <NewFile title="Añadir nuevo expediente" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

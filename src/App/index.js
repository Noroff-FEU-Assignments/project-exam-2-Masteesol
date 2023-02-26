import {
  Layout,
  AboutUs,
  Feed,
  ProfileMine,
  CarouselNavigation,
  ProfileOthers,
  LogoNav,
} from "./Components";
import { ModalProviderPosts } from "../context/ModalContextPosts";
import { ModalProviderSettings } from "../context/ModalContextSettings";
import { AuthProvider } from "../context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import auth from "../context/auth";
import { FollowProvider } from "../context/FollowContext";

const router = createBrowserRouter([
  {
    path: "/app",
    element: (
      <>
        <LogoNav />
        <CarouselNavigation>
          <AboutUs />
          <Feed />
          <ProfileMine />
        </CarouselNavigation>
      </>
    ),
    errorElement: <h1>Error: couldn't load</h1>,
  },
  {
    path: "/",
    element: <Navigate to={auth ? "/app?index=1" : "app/login"} />,
    errorElement: <h1>Error: couldn't load</h1>,
  },
  {
    path: "/user",
    element: (
      <>
        <LogoNav />
        <ProfileOthers />
      </>
    ),
    errorElement: <h1>Error: couldn't load</h1>,
  },
]);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ModalProviderSettings>
          <ModalProviderPosts>
            <FollowProvider>
              <Layout>
                <RouterProvider router={router} />
              </Layout>
            </FollowProvider>
          </ModalProviderPosts>
        </ModalProviderSettings>
      </AuthProvider>
    </div>
  );
}

export default App;

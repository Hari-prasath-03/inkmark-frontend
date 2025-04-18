import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import MarkDownLayout from "./layouts/MarkDownLayout";

import GlobalProvider from "./context/GlobalContext";
import { DotLoader } from "react-spinners";
import { Suspense } from "react";
import { lazy } from "react";
import History from "./pages/History";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";

const MarkDownEditor = lazy(() => import("./pages/MarkDownEditor"));
const MarkDownEditorWithId = lazy(() => import("./pages/MarkDownEditorWithId"));
const ViewMarkDown = lazy(() => import("./pages/ViewMarkDown"));
const Storage = lazy(() => import("./pages/Storage"));

export const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <DotLoader color="#5C6BC0" />
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Hero />,
      path: "/",
    },
    {
      path: "/",
      element: (
        <GlobalProvider>
          <RootLayout />
        </GlobalProvider>
      ),
      children: [
        {
          element: <MarkDownLayout />,
          children: [
            {
              path: "/md/create",
              element: <MarkDownEditor />,
            },
            {
              path: "/md/edit/:id",
              element: <MarkDownEditorWithId />,
            },
            {
              path: "/md/view/:id",
              element: <ViewMarkDown />,
            },
          ].map((route) => ({
            ...route,
            element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
          })),
        },
        {
          path: "/mine",
          element: <Storage />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/trash",
          element: <Trash />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ].map((route) => ({
        ...route,
        element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
      })),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

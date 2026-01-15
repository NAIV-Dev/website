import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { LandingPage } from './pages/landing-page'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { GetStartedPage, loaderGetStartedPage } from './pages/get-started-page'
import { LearnDSLPage } from './pages/learn-dsl-page'
import { MilestonePage } from './pages/milestone-page'
import { UserStoryPage } from './pages/user-story-page'
import { LearningResourcesPage, loaderLearningResourcesPage } from './pages/learning-resources'
import { DocumentationPage, loaderDocumentationPage } from './pages/documentation'
import { ZeroServicesPage } from './pages/zero-services-page'
import { ConfirmEmailPage, loaderConfirmEmailPage } from './pages/confirm-email'
import { AxiosClient } from './api-client/AxiosClient'
import { loaderResetPasswordPage, ResetPasswordPage } from './pages/reset-password'
import { PlaygroundPage } from './pages/playground-page'
import { GetStartedPageForTypescript, loaderGetStartedPageForTypescript } from './pages/get-started-for-typescript'
import { loaderWorkingWithAntigravity, WorkingWithAntigravity } from './pages/working-with-antigravity'

AxiosClient.BaseURL.instance.set(import.meta.env.VITE_API_ENDPOINT_URL || 'https://api-x.naiv.dev');
createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/get-started",
        // element: <GetStartedPage />,
        // loader: loaderGetStartedPage,
        element: <GetStartedPageForTypescript />,
        loader: loaderGetStartedPageForTypescript
      },
      {
        path: "/learn-dsl",
        element: <LearnDSLPage />,
      },
      {
        path: "/milestone",
        element: <MilestonePage />,
      },
      {
        path: "/user-story",
        element: <UserStoryPage />,
      },
      {
        path: "/documentation",
        element: <DocumentationPage />,
        loader: loaderDocumentationPage,
      },
      {
        path: "/learning-resources/:slug",
        element: <LearningResourcesPage />,
        loader: loaderLearningResourcesPage,
      },
      {
        path: "/zero",
        element: <ZeroServicesPage />,
      },
      {
        path: "/playground",
        element: <PlaygroundPage />,
      },
      {
        path: "/confirm-email",
        element: <ConfirmEmailPage />,
        loader: loaderConfirmEmailPage,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
        loader: loaderResetPasswordPage
      },
      {
        path: "/working-with-antigravity",
        element: <WorkingWithAntigravity />,
        loader: loaderWorkingWithAntigravity
      },
    ])} />
  </HeroUIProvider>
)

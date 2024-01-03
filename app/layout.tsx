import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavBar } from '@components/NavBar'
import { Provider } from "@components/Provider";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Try My Cocktail",
  description: "Blog pour partager vos propres recettes de cocktails, ou pour vous donner des idées en fonction de l'alcool que vous avez",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Provider>

        <MantineProvider theme={theme}>
        <NavBar/>
          {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  )
}

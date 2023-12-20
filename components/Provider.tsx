"use client"
import React from 'react'
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function Provider({children, session} : SessionProviderProps) {
  return (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )
}

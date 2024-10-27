"use client";

import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <header className="w-full max-w-4xl mx-auto mb-8" aria-label="Main header">
        <h1 className="text-3xl font-bold text-center text-primary">
          Habitat Weather App
        </h1>
      </header>
      <main className="w-full max-w-4xl mx-auto flex-grow" aria-label="Main content">
        {children}
      </main>
      <footer className="w-full max-w-4xl mx-auto mt-8" aria-label="Main footer">
        <p className="text-center text-sm text-gray-500">
          © 2024 Habitat. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

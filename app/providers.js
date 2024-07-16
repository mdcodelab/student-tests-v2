"use client";

import { ThemeProvider } from "../components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function Providers({ children }) {

  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
  );
}

export default Providers;

"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Theme from "../themes/theme";
import { useMediaQuery, Container } from "@mui/material";



export default function Layout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <html lang="en">
      <head />
      <body>
        <Theme mode={theme}>
          <QueryClientProvider client={queryClient}>
   
            <main style={{ padding: "20px" }}>
              <Container maxWidth="lg" sx={{ padding: 2 }}>
              {children}
              </Container>
            </main>
           
          </QueryClientProvider>
        </Theme>
      </body>
    </html>
  );
}


import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "./defaultTheme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      { children }
    </ThemeProvider>
  )
}

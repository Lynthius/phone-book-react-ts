import { useContext } from "react"
import { ThemeContext } from "@emotion/react"

export const useThemeContext=()=>{
  const ctx=useContext(ThemeContext)

  if(!ctx){ // poza komponentem dziecka providera zwróci nulla
      throw new Error("Missing themeContext, it's not wrapped in ThemeProvider")
  }
  return ctx
}
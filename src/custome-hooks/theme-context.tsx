import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_ID,
  ThemeProvider as MaterialThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeUIProvider } from "theme-ui";
import { themeUIThemeBlack, themeUIThemeWhite } from "../theme/themes";
import { db } from "../db-local/index-db-wrapper";
type Theme = "white" | "black";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("white");
  useEffect(() => {
    db.theme.get(1).then((themeValue) => {
      console.log("Theme from DB:", themeValue);
      // You can set state here if needed
      if (!themeValue) {
        setTheme("black");
        db.updateTheme("black");
      } else {
        setTheme(themeValue.value as Theme);
      }
    });
  }, []);
  const toggleTheme = () => {
    db.updateTheme(theme === "white" ? "black" : "white");
    setTheme((prev) => (prev === "white" ? "black" : "white"));
  };

  const themSettings = {
    white: themeUIThemeWhite,
    black: themeUIThemeBlack,
  };

  // Map your custom theme to a valid MUI ThemeOptions object
  const muiThemeOptions = {
    white: {
      palette: {
        mode: "light" as const,
        background: {
          default: themeUIThemeWhite.colors.background,
        },
        text: {
          primary: themeUIThemeWhite.colors.text,
        },
        primary: {
          main: themeUIThemeWhite.colors.primary,
        },
      },
      typography: {
        fontFamily: themeUIThemeWhite.fonts.body,
        h1: { fontFamily: themeUIThemeWhite.fonts.heading },
        h2: { fontFamily: themeUIThemeWhite.fonts.heading },
        h3: { fontFamily: themeUIThemeWhite.fonts.heading },
        h4: { fontFamily: themeUIThemeWhite.fonts.heading },
        h5: { fontFamily: themeUIThemeWhite.fonts.heading },
        h6: { fontFamily: themeUIThemeWhite.fonts.heading },
      },
    },
    black: {
      palette: {
        mode: "dark" as const,
        background: {
          default: themeUIThemeBlack.colors.background,
        },
        text: {
          primary: themeUIThemeBlack.colors.text,
        },
        primary: {
          main: themeUIThemeBlack.colors.primary,
        },
      },
      typography: {
        fontFamily: themeUIThemeBlack.fonts.body,
        h1: { fontFamily: themeUIThemeBlack.fonts.heading },
        h2: { fontFamily: themeUIThemeBlack.fonts.heading },
        h3: { fontFamily: themeUIThemeBlack.fonts.heading },
        h4: { fontFamily: themeUIThemeBlack.fonts.heading },
        h5: { fontFamily: themeUIThemeBlack.fonts.heading },
        h6: { fontFamily: themeUIThemeBlack.fonts.heading },
      },
    },
  };

  const materialTheme = createTheme(muiThemeOptions[theme]);

  return (
    <ThemeUIProvider theme={themSettings[theme]}>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </MaterialThemeProvider>
    </ThemeUIProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

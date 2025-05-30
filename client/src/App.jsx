import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(defaultConfig, config)

export default function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Routes pages={pages} />
      </BrowserRouter>
    </ChakraProvider>
  );
}

import { Main } from "./src/Main";
import { StatusBar } from "expo-status-bar";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Main />
    </>
  );
}

import "./App.css";
import { useGlobalContext } from "./context/context";
import {
  SearchComponent,
  Videos,
  NavComponent,
  PaginationComponent,
} from "./components/components";
import React from "react";

function App() {
  const { paginatedVideos } = useGlobalContext();
  return (
    <main>
      <SearchComponent />
      <NavComponent />
      {paginatedVideos.length ? <Videos /> : null}
      {paginatedVideos.length > 1 ? <PaginationComponent /> : null}
    </main>
  );
}

export default App;

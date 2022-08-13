import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchData from "./components/FetchData";
import PostById from "./components/PostById";

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<FetchData />} />
        <Route path="/posts/:id" element={<PostById />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;

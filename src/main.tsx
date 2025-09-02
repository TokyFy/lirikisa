import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "./win95.css";
import '@react95/core/GlobalStyle';

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AGENTS } from '@react95/clippy';
import { useClippy, ClippyProvider } from '@react95/clippy';
export const queryClient = new QueryClient({});


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ClippyProvider agentName={AGENTS.MERLIN}>
            <App />
        </ClippyProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </BrowserRouter>
);

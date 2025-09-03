import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import Result from "./Page/Result/Result";
import Lyrics from "./Page/Lyrics/Lyrics";
import Artist from "./Page/Artist/Artist";

import {Frame} from "@react95/core";
import { useEffect, useRef, useState } from "react";
import { useClippy, ClippyProvider } from '@react95/clippy';
import { AGENTS } from '@react95/clippy';
import { DraggableFrame } from "./components/Draggable";

function App() {

    const { clippy } = useClippy();

    useEffect(() => {
        if (clippy) {
            clippy.play('Wave');
            clippy.speak('Thannks for your visits', false);
        }
    }, [clippy]); 

  return (
  <ClippyProvider agentName={AGENTS.MERLIN}>
    <div className="relative w-full h-screen p-3">
      <DraggableFrame>
        <div className="w-full max-w-lg rounded-md border-neutral-400">
        {/* @ts-ignore */}
        <Frame w={512}  bgColor="$material" boxShadow="$out" padding="$12">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Result />} />
            <Route path="lyrics/:id" element={<Lyrics />} />
            <Route path="artist/:id" element={<Artist />} />
          </Routes>
        </Frame>
        </div>
      </DraggableFrame>
    </div>
  </ClippyProvider>
  );
}
export default App;
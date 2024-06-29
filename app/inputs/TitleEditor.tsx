"use client"
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { useState, useEffect } from "react";

interface TextAreaProps {
  text: any;
  setText: any;
}

const TitleEditor = ({ text, setText }: TextAreaProps) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
        setText(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <>
      <div className="w-full" style={{ height: 50 }}>
        <div ref={quillRef} />
      </div>
    </>
  );
};

export default TitleEditor;

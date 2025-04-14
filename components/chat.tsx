"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ToolCall from "./tool-call";
import Message from "./message";
import Annotations from "./annotations";
import { Item } from "@/lib/assistant";
import { Bot, Loader } from "lucide-react";

interface ChatProps {
  items: Item[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const Chat: React.FC<ChatProps> = ({ items, onSendMessage, isLoading = false }) => {
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !isComposing) {
      event.preventDefault();
      onSendMessage(inputMessageText);
      setinputMessageText("");
    }
  }, [onSendMessage, inputMessageText, isComposing]);

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  return (
    <div className="flex justify-center items-center size-full">
      <div className="flex grow flex-col h-full max-w-[750px] gap-2">
        <div className="h-[calc(90vh-100px)] overflow-y-scroll px-4 md:px-6 flex flex-col scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="mt-auto space-y-2 py-4">
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center p-8 my-8">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-3 mb-4">
                  <Bot size={32} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Welcome to the Assistant</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">Ask me anything and I&apos;ll do my best to help you with your questions.</p>
              </div>
            )}
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "tool_call" ? (
                  <ToolCall toolCall={item} />
                ) : item.type === "message" ? (
                  <div className="flex flex-col gap-1">
                    <Message message={item} />
                    {item.content &&
                      item.content[0].annotations &&
                      item.content[0].annotations.length > 0 && (
                        <Annotations
                          annotations={item.content[0].annotations}
                        />
                      )}
                  </div>
                ) : null}
              </React.Fragment>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-600 dark:bg-emerald-500 text-white rounded-full p-2 flex items-center justify-center h-8 w-8 mt-1">
                    <Bot size={16} />
                  </div>
                  <div className="mr-4 rounded-2xl px-4 py-3 md:mr-8 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <Loader size={16} className="animate-spin text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400 animate-pulse-soft">Assistant is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={itemsEndRef} />
          </div>
        </div>
        
        <div className="sticky bottom-0 p-4 md:px-6">
          <div className="relative">
            <div className="flex w-full items-end overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus-within:border-indigo-300 dark:focus-within:border-indigo-700 focus-within:ring-1 focus-within:ring-indigo-300 dark:focus-within:ring-indigo-700 transition-all">
              <textarea
                id="prompt-textarea"
                tabIndex={0}
                dir="auto"
                rows={1}
                placeholder="Message..."
                className="min-h-[48px] max-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3 text-sm focus:outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                value={inputMessageText}
                onChange={(e) => {
                  setinputMessageText(e.target.value);
                  // Auto-resize textarea
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                }}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                disabled={isLoading}
              />
              <button
                disabled={!inputMessageText || isLoading}
                data-testid="send-button"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full mr-1 mb-1 transition-all ${
                  inputMessageText && !isLoading 
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
                onClick={() => {
                  onSendMessage(inputMessageText);
                  setinputMessageText("");
                  // Reset textarea height
                  const textarea = document.getElementById('prompt-textarea');
                  if (textarea) textarea.style.height = 'auto';
                }}
              >
                {isLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 rotate-90"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              Press Enter to send, Shift+Enter for a new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

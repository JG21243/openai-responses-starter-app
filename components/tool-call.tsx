import React from "react";

import { ToolCallItem } from "@/lib/assistant";
import { BookOpenText, Clock, Globe, Zap, Loader2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ToolCallProps {
  toolCall: ToolCallItem;
}

function ApiCallCell({ toolCall }: ToolCallProps) {
  const isCompleted = toolCall.status === "completed";
  
  return (
    <div className="flex flex-col w-full md:w-[80%] relative mb-2">
      <div className="w-full">
        <div className="flex flex-col text-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="font-medium p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className={`p-1.5 rounded-full ${isCompleted 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                : 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300'}`}>
                {isCompleted ? <Zap size={16} /> : <Loader2 size={16} className="animate-spin" />}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {isCompleted ? `${toolCall.name}` : `Calling ${toolCall.name}...`}
              </div>
            </div>
            
            {isCompleted && (
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">
                Completed
              </span>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-gray-900 py-2">
            <div className="px-4">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Input Parameters</div>
              <div className="max-h-60 overflow-y-auto text-xs rounded-md">
                <SyntaxHighlighter
                  customStyle={{
                    borderRadius: '6px',
                    padding: "12px",
                    marginTop: 0,
                    marginBottom: 8,
                    fontSize: "12px",
                    backgroundColor: "#1e1e1e", // Dark background regardless of mode
                  }}
                  language="json"
                  style={vscDarkPlus}
                >
                  {JSON.stringify(toolCall.parsedArguments, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
            
            <div className="px-4 pt-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Response</div>
              <div className="max-h-60 overflow-y-auto text-xs rounded-md">
                {toolCall.output ? (
                  <SyntaxHighlighter
                    customStyle={{
                      borderRadius: '6px',
                      padding: "12px",
                      marginTop: 0,
                      marginBottom: 0,
                      fontSize: "12px",
                      backgroundColor: "#1e1e1e", // Dark background regardless of mode
                    }}
                    language="json"
                    style={vscDarkPlus}
                  >
                    {JSON.stringify(JSON.parse(toolCall.output), null, 2)}
                  </SyntaxHighlighter>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2 py-3 px-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <Clock size={14} className="animate-pulse" /> 
                    <span>Waiting for result...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileSearchCell({ toolCall }: ToolCallProps) {
  const isCompleted = toolCall.status === "completed";
  
  return (
    <div className="flex flex-col w-full relative mb-2">
      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-2 px-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
        {isCompleted ? (
          <BookOpenText size={16} />
        ) : (
          <Loader2 size={16} className="animate-spin" />
        )}
        <div className="text-sm font-medium">
          {isCompleted ? "Searched files" : "Searching files..."}
        </div>
      </div>
    </div>
  );
}

function WebSearchCell({ toolCall }: ToolCallProps) {
  const isCompleted = toolCall.status === "completed";
  
  return (
    <div className="flex flex-col w-full relative mb-2">
      <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 py-2 px-3 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900">
        {isCompleted ? (
          <Globe size={16} />
        ) : (
          <Loader2 size={16} className="animate-spin" />
        )}
        <div className="text-sm font-medium">
          {isCompleted ? "Searched the web" : "Searching the web..."}
        </div>
      </div>
    </div>
  );
}

export default function ToolCall({ toolCall }: ToolCallProps) {
  return (
    <div className="flex justify-start py-2">
      {(() => {
        switch (toolCall.tool_type) {
          case "function_call":
            return <ApiCallCell toolCall={toolCall} />;
          case "file_search_call":
            return <FileSearchCell toolCall={toolCall} />;
          case "web_search_call":
            return <WebSearchCell toolCall={toolCall} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

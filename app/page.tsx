"use client";
import Assistant from "@/components/assistant";
import ToolsPanel from "@/components/tools-panel";
import { Menu, X, Bot } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Main() {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* App Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full p-1.5 mr-2">
                <Bot size={20} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">OpenAI Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <a href="https://github.com/openai/openai-responses-starter-app" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">GitHub</a>
                <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Documentation</a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto border-x border-gray-100 dark:border-gray-800">
        <div className="w-full md:w-[70%] border-r border-gray-100 dark:border-gray-800">
          <Assistant />
        </div>
        <div className="hidden md:block w-[30%] bg-white dark:bg-gray-900 shadow-sm">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Configuration</h2>
          </div>
          <ToolsPanel />
        </div>
        {/* Hamburger menu for small screens */}
        <div className="fixed top-20 right-4 md:hidden z-40">
          <button 
            onClick={() => setIsToolsPanelOpen(true)}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={24} className="text-gray-800 dark:text-gray-200" />
          </button>
        </div>
        {/* Overlay panel for ToolsPanel on small screens */}
        {isToolsPanelOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="w-[85%] bg-white dark:bg-gray-900 h-full shadow-lg animate-slide-left">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Configuration</h2>
                <button 
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                  onClick={() => setIsToolsPanelOpen(false)}
                >
                  <X size={20} className="text-gray-800 dark:text-gray-200" />
                </button>
              </div>
              <ToolsPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

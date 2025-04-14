"use client";
import React from "react";
import FileSearchSetup from "./file-search-setup";
import WebSearchConfig from "./websearch-config";
import FunctionsView from "./functions-view";
import PanelConfig from "./panel-config";
import useToolsStore from "@/stores/useToolsStore";
import { Database, Globe, Terminal } from "lucide-react";

export default function ContextPanel() {
  const {
    fileSearchEnabled,
    setFileSearchEnabled,
    webSearchEnabled,
    setWebSearchEnabled,
    functionsEnabled,
    setFunctionsEnabled,
  } = useToolsStore();
  
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col overflow-y-auto h-full p-4 space-y-4">
        <div className="mb-2">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-1">Assistant Tools</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure the capabilities of your assistant</p>
        </div>
        
        <div className="space-y-4">
          <PanelConfig
            title="File Search"
            tooltip="Search through knowledge bases (vector stores)"
            enabled={fileSearchEnabled}
            setEnabled={setFileSearchEnabled}
            icon={<Database size={18} />}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <FileSearchSetup />
            </div>
          </PanelConfig>
          
          <PanelConfig
            title="Web Search"
            tooltip="Allow the assistant to search the web for up-to-date information"
            enabled={webSearchEnabled}
            setEnabled={setWebSearchEnabled}
            icon={<Globe size={18} />}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <WebSearchConfig />
            </div>
          </PanelConfig>
          
          <PanelConfig
            title="Functions"
            tooltip="Access specialized functions like weather data, jokes, and more"
            enabled={functionsEnabled}
            setEnabled={setFunctionsEnabled}
            icon={<Terminal size={18} />}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <FunctionsView />
            </div>
          </PanelConfig>
        </div>
      </div>
    </div>
  );
}

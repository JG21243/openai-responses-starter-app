"use client";

import React from "react";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipProvider } from "./ui/tooltip";
import { InfoIcon } from "lucide-react";

export default function PanelConfig({
  title,
  tooltip,
  enabled,
  setEnabled,
  disabled,
  children,
  icon,
}: {
  title: string;
  tooltip: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const handleToggle = () => {
    setEnabled(!enabled);
  };

  return (
    <div className={`rounded-lg border ${
      enabled 
        ? 'border-indigo-200 dark:border-indigo-900 bg-indigo-50/30 dark:bg-indigo-900/20' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      } transition-colors`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon && (
              <div className={`p-1.5 rounded-md ${
                enabled 
                  ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                {icon}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <h3 className="text-gray-800 dark:text-gray-100 font-medium">{title}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                      <InfoIcon size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 dark:bg-gray-700 text-white text-xs">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Switch
            id={title}
            checked={enabled}
            onCheckedChange={handleToggle}
            disabled={disabled}
            className="data-[state=checked]:bg-indigo-600"
          />
        </div>
      </div>
      {enabled && <div className="mt-1">{children}</div>}
    </div>
  );
}

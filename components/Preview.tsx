import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    try {
      // @ts-ignore
      if (!window.Babel) {
        throw new Error("Babel not loaded");
      }

      // 1. Transform code using Babel
      // We use 'env' to handle imports/exports (transforming to CommonJS)
      // We use 'react' to transform JSX
      // @ts-ignore
      const transpiled = window.Babel.transform(code, {
        presets: [
          ['env', { modules: 'commonjs' }],
          ['react']
        ],
        filename: 'preview.tsx',
      }).code;

      // 2. Mock CommonJS environment
      const exports: any = {};
      const module = { exports };
      
      const require = (moduleName: string) => {
        if (moduleName === 'react') return React;
        if (moduleName === 'lucide-react') return LucideIcons;
        console.warn(`Module not found: ${moduleName}`);
        return null;
      };

      // 3. Execute the code
      // We wrap the code in a function to provide the scope
      const renderFunc = new Function('React', 'exports', 'require', 'module', transpiled);
      
      renderFunc(React, exports, require, module);

      // 4. Extract the component
      // Handle export default (common in the generated code)
      const GeneratedComponent = module.exports.default || exports.default || module.exports;

      if (GeneratedComponent) {
        setComponent(() => GeneratedComponent);
        setError(null);
      } else {
        throw new Error("No component found. Ensure the component is exported as default.");
      }

    } catch (err: any) {
      console.error("Preview Error:", err);
      // Nice error message formatting
      setError(err.message || "Failed to render component");
      setComponent(null);
    }
  }, [code]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-400 p-6 bg-red-900/10 border border-red-800 rounded-lg">
        <div className="text-center">
            <LucideIcons.AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Rendering Error</h3>
            <p className="font-mono text-sm opacity-80 whitespace-pre-wrap">{error}</p>
        </div>
      </div>
    );
  }

  if (!Component) {
    return (
        <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
                <LucideIcons.Code2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Waiting for code...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto bg-white/5 rounded-lg border border-slate-700/50 shadow-inner relative">
       <div className="absolute inset-0 p-8 min-h-full">
            <div className="bg-transparent h-full w-full">
                <Component />
            </div>
       </div>
    </div>
  );
};

export default Preview;
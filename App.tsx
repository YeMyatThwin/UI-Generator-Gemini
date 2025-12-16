import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Preview from './components/Preview';
import FigmaButton from './components/FigmaButton';
import { generateUI } from './services/geminiService';
import { Maximize2, Minimize2, Laptop, Smartphone, Tablet, Download, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  
  // Initial demo code to show something on load
  useEffect(() => {
    // Optional: Could set an initial hello world state
  }, []);

  const getPreviewElement = (): HTMLElement | null => {
    // Find the preview container element
    const previewContainer = document.querySelector('[data-preview-container]') as HTMLElement;
    return previewContainer;
  };

  const handleGenerate = async (prompt: string, contextFiles?: File[]) => {
    setIsLoading(true);
    try {
      const code = await generateUI(prompt, contextFiles);
      setCurrentCode(code);
      
      // Save the generated code to the "generated pages" folder
      const timestamp = new Date().getTime();
      const filename = `generated-${timestamp}.tsx`;
      
      // Trigger download with the correct filename
      const blob = new Blob([code], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      // Show save notification
      setSaveNotification(`Saved as ${filename}`);
      setTimeout(() => setSaveNotification(null), 3000);
      
      console.log(`Code saved to downloads. Please move ${filename} to the "generated pages" folder.`);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Save Notification */}
      {saveNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle size={20} />
          <span className="text-sm font-medium">{saveNotification}</span>
        </div>
      )}
      
      {/* Left Sidebar - Chat & Code */}
      <div className="w-full md:w-[400px] flex-shrink-0 h-full z-10 shadow-2xl shadow-black/50">
        <ChatInterface 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
            currentCode={currentCode}
        />
      </div>

      {/* Right Area - Canvas/Preview */}
      <div className="flex-1 flex flex-col h-full bg-[#0B1120] relative">
        
        {/* Toolbar */}
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-sm z-20">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
                <span className="text-slate-500">Preview</span>
                <div className="h-4 w-px bg-slate-700 mx-2"></div>
                <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
                    <button 
                        onClick={() => setViewMode('desktop')}
                        className={`p-1.5 rounded transition-all ${viewMode === 'desktop' ? 'bg-slate-700 text-white shadow-sm' : 'hover:text-slate-200'}`}
                        title="Desktop View"
                    >
                        <Laptop size={16} />
                    </button>
                    <button 
                        onClick={() => setViewMode('tablet')}
                        className={`p-1.5 rounded transition-all ${viewMode === 'tablet' ? 'bg-slate-700 text-white shadow-sm' : 'hover:text-slate-200'}`}
                        title="Tablet View"
                    >
                        <Tablet size={16} />
                    </button>
                    <button 
                        onClick={() => setViewMode('mobile')}
                        className={`p-1.5 rounded transition-all ${viewMode === 'mobile' ? 'bg-slate-700 text-white shadow-sm' : 'hover:text-slate-200'}`}
                        title="Mobile View"
                    >
                        <Smartphone size={16} />
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <FigmaButton 
                  code={currentCode} 
                  disabled={isLoading}
                  onCopyDesign={getPreviewElement}
                />
                <div className="text-xs text-slate-500 hidden lg:block">
                    Generated output is running in a secure sandbox
                </div>
            </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 to-slate-950">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }}>
            </div>

            {/* Resizable Container */}
            <div 
                data-preview-container
                className={`
                    relative bg-white shadow-2xl transition-all duration-500 ease-in-out border border-slate-700 overflow-hidden
                    ${viewMode === 'desktop' ? 'w-full h-full rounded-md' : ''}
                    ${viewMode === 'tablet' ? 'w-[768px] h-[1024px] max-h-[90%] rounded-xl ring-8 ring-slate-800' : ''}
                    ${viewMode === 'mobile' ? 'w-[375px] h-[812px] max-h-[90%] rounded-[3rem] ring-8 ring-slate-800' : ''}
                `}
            >
                {/* Status Bar simulation for mobile/tablet */}
                {(viewMode === 'mobile' || viewMode === 'tablet') && (
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black text-white flex justify-between px-6 items-center z-50 text-[10px] font-medium opacity-90 pointer-events-none rounded-t-[2.5rem]">
                        <span>9:41</span>
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                            <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                )}

                {/* Actual Content */}
                <div className={`w-full h-full overflow-y-auto bg-white ${(viewMode === 'mobile' || viewMode === 'tablet') ? 'pt-6' : ''}`}>
                    {currentCode ? (
                        <Preview code={currentCode} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                             <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <Laptop className="w-10 h-10 text-slate-300" />
                             </div>
                             <p className="text-lg font-medium text-slate-500">Ready to build</p>
                             <p className="text-sm mt-2 max-w-xs text-center text-slate-400">Enter a prompt in the sidebar to generate your first React component.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
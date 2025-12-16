import React, { useState } from 'react';
import { Figma, Copy, Check, Settings, ExternalLink, Image } from 'lucide-react';
import { copyDesignAsImage } from '../services/figmaService';

interface FigmaButtonProps {
  code: string | null;
  disabled?: boolean;
  onCopyDesign?: () => HTMLElement | null;
}

const FigmaButton: React.FC<FigmaButtonProps> = ({ code, disabled = false, onCopyDesign }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [accessToken, setAccessToken] = useState(() => 
    localStorage.getItem('figma_access_token') || ''
  );
  const [fileKey, setFileKey] = useState(() => 
    localStorage.getItem('figma_file_key') || ''
  );

  const handleCopyDesign = async () => {
    if (!code || !onCopyDesign) return;
    
    setCopying(true);
    const previewElement = onCopyDesign();
    
    if (previewElement) {
      const success = await copyDesignAsImage(previewElement);
      setCopying(false);
      
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setShowMenu(false);
      }
    } else {
      setCopying(false);
      alert('Preview element not found. Please wait for the design to render.');
    }
  };

  const handleCopyCode = async () => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const saveConfig = () => {
    localStorage.setItem('figma_access_token', accessToken);
    localStorage.setItem('figma_file_key', fileKey);
    setShowConfig(false);
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={disabled || !code}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${disabled || !code
            ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50 hover:shadow-purple-900/70'
          }
        `}
        title="Copy to Figma"
      >
        <Figma size={16} />
        <span className="hidden md:inline">Figma</span>
        {copied && <Check size={14} className="animate-in fade-in" />}
      </button>

      {/* Dropdown Menu */}
      {showMenu && !disabled && code && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-40 overflow-hidden">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Export Options
              </div>
              
              <button
                onClick={handleCopyDesign}
                disabled={copying}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image size={16} className="text-purple-400" />
                <div className="flex-1 text-left">
                  <div className="font-medium">
                    {copying ? 'Capturing...' : 'Copy Design'}
                  </div>
                  <div className="text-xs text-slate-400">
                    Paste as image in Figma
                  </div>
                </div>
              </button>

              <button
                onClick={handleCopyCode}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded transition-colors"
              >
                <Copy size={16} className="text-blue-400" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Copy Code</div>
                  <div className="text-xs text-slate-400">
                    Copy React component
                  </div>
                </div>
              </button>

              <div className="h-px bg-slate-700 my-2" />

              <button
                onClick={() => {
                  setShowConfig(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded transition-colors"
              >
                <Settings size={16} className="text-slate-400" />
                <div className="flex-1 text-left">
                  <div className="font-medium">API Settings</div>
                  <div className="text-xs text-slate-400">
                    Configure Figma API
                  </div>
                </div>
              </button>

              <a
                href="https://help.figma.com/hc/en-us/articles/360039827194-Embed-files-and-prototypes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded transition-colors"
              >
                <ExternalLink size={16} className="text-slate-400" />
                <div className="flex-1 text-left">
                  <div className="font-medium">How to Embed</div>
                  <div className="text-xs text-slate-400">
                    View guide
                  </div>
                </div>
              </a>
            </div>
          </div>
        </>
      )}

      {/* Config Modal */}
      {showConfig && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setShowConfig(false)}
          >
            <div 
              className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Figma size={20} className="text-purple-400" />
                    Figma API Settings
                  </h3>
                  <button
                    onClick={() => setShowConfig(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Access Token
                    </label>
                    <input
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="figd_..."
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Get it from{' '}
                      <a
                        href="https://www.figma.com/developers/api#access-tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline"
                      >
                        Figma settings
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      File Key
                    </label>
                    <input
                      type="text"
                      value={fileKey}
                      onChange={(e) => setFileKey(e.target.value)}
                      placeholder="abc123..."
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      From your Figma file URL
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowConfig(false)}
                    className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveConfig}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Copy Success Notification */}
      {copied && (
        <div className="absolute -bottom-12 right-0 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check size={16} />
          Copied!
        </div>
      )}
    </div>
  );
};

export default FigmaButton;

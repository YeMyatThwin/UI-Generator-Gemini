import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Code, Eye, Play, Paperclip, X } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  onGenerate: (prompt: string, contextFiles?: File[]) => Promise<void>;
  isLoading: boolean;
  currentCode: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onGenerate, isLoading, currentCode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    const currentFiles = [...attachedFiles];
    setInput('');
    setAttachedFiles([]);
    setActiveTab('chat');

    try {
      await onGenerate(currentInput, currentFiles.length > 0 ? currentFiles : undefined);
      // We assume onGenerate handles the API call and state update
      // We add a system message to indicate completion if needed, but the preview updating is the real feedback.
      setMessages(prev => [...prev, { role: 'model', content: "Code generated! Check the preview." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Something went wrong. Please try again." }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 w-full max-w-md">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-slate-100 tracking-tight">UI Gen</h1>
        </div>
        
        <div className="flex bg-slate-800 rounded-md p-1">
            <button 
                onClick={() => setActiveTab('chat')}
                className={`p-1.5 rounded-sm transition-all ${activeTab === 'chat' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                title="Chat"
            >
                <Play size={16} />
            </button>
            <button 
                onClick={() => setActiveTab('code')}
                className={`p-1.5 rounded-sm transition-all ${activeTab === 'code' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                title="View Code"
                disabled={!currentCode}
            >
                <Code size={16} />
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'chat' ? (
             <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.length === 0 && (
                        <div className="text-center text-slate-500 mt-12 px-4">
                            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="text-sm">Describe the UI you want to build.</p>
                            <p className="text-xs mt-2 opacity-70">"A landing page for a coffee shop"</p>
                            <p className="text-xs opacity-70">"A dashboard with a sidebar and chart placeholders"</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700 flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                                <span className="text-xs text-slate-400">Thinking & Coding...</span>
                             </div>
                        </div>
                    )}
                </div>
             </div>
        ) : (
            <div className="absolute inset-0 overflow-auto bg-slate-950 p-4">
                <pre className="font-mono text-xs text-blue-300 whitespace-pre-wrap leading-relaxed">
                    {currentCode || "// No code generated yet."}
                </pre>
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        {/* Attached Files */}
        {attachedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                <Paperclip size={12} />
                <span className="max-w-[120px] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="relative">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".txt,.md,.json,.tsx,.ts,.jsx,.js,.png,.jpg,.jpeg,.gif,.webp,.svg"
              onChange={handleFileSelect}
              className="hidden"
            />
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                placeholder="Describe your UI... (Shift+Enter for new line)"
                className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 border border-slate-700 rounded-xl pl-4 pr-20 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none h-14 max-h-32 transition-all scrollbar-hide text-sm"
            />
            <div className="absolute right-2 top-2 flex gap-1">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                    title="Attach files"
                >
                    <Paperclip size={16} />
                </button>
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={16} />
                </button>
            </div>
        </form>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-600">Powered by Gemini 3 Pro Preview</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
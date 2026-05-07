
import React from 'react';
import { motion } from 'motion/react';
import { Zap, Copy, Download, Trash2, Send, Wand2, Hash, Type, Code as CodeIcon, Palette, Binary, Globe } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { toast } from 'react-hot-toast';

interface ToolEngineProps {
  toolId: string;
  onClose: () => void;
}

export const ToolEngine: React.FC<ToolEngineProps> = ({ toolId, onClose }) => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const processAiTool = async () => {
    if (!input) return;
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are an expert utility tool for "Ibrahim Analytical". 
      Tool Task ID: ${toolId}
      Input: ${input}
      Provide the result strictly in the format expected for this tool. No conversational text. if it's a generator, provide the code/file content. if it's an audit, provide a list of points.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setOutput(response.text);
    } catch (e) {
      toast.error("AI engine error");
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const processUtilityTool = () => {
    try {
      switch (toolId) {
        case 'word-counter':
          setOutput(`Words: ${input.trim().split(/\s+/).length}\nCharacters: ${input.length}\nLines: ${input.split('\n').length}`);
          break;
        case 'case-converter':
          setOutput(`UPPER: ${input.toUpperCase()}\nlower: ${input.toLowerCase()}\nTitle: ${input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}`);
          break;
        case 'base64-encode':
          setOutput(btoa(input));
          break;
        case 'json-beautifier':
          setOutput(JSON.stringify(JSON.parse(input), null, 2));
          break;
        case 'hex-rgb':
          const hex = input.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          setOutput(`rgb(${r}, ${g}, ${b})`);
          break;
        case 'binary-converter':
          setOutput(input.split('').map(c => c.charCodeAt(0).toString(2)).join(' '));
          break;
        default:
          setOutput("Logic not yet implemented for this specific utility. Defaulting to AI...");
          processAiTool();
      }
    } catch (e) {
      toast.error("Format error");
    }
  };

  const isAi = ['seo-audit', 'robots-gen', 'meta-gen', 'palette-gen', 'lorem-ipsum'].includes(toolId);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 w-full max-w-4xl mx-auto space-y-6 bg-cyber-gray"
    >
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h2 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3">
          <Wand2 className="text-neon-cyan" size={20} />
          {toolId.replace(/-/g, ' ')}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-white/40">×</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-[10px] text-gray-500 uppercase font-mono font-bold">Input Dashboard</label>
          <textarea 
            className="w-full h-64 bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-sm focus:border-neon-cyan outline-none resize-none"
            placeholder={isAi ? "Describe what you need or paste URL..." : "Paste text here..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={isAi ? processAiTool : processUtilityTool}
            disabled={isProcessing || !input}
            className="w-full py-4 bg-neon-cyan text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? <Zap className="animate-spin" size={16} /> : <Send size={16} />}
            <span>Process Intelligence</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] text-gray-500 uppercase font-mono font-bold">Output Stream</label>
            <div className="flex gap-2">
              <button 
                onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied to clipboard"); }}
                className="p-1 hover:text-neon-cyan transition-colors"
                title="Copy Output"
              >
                <Copy size={14} />
              </button>
              <button 
                onClick={() => setOutput('')}
                className="p-1 hover:text-red-500 transition-colors"
                title="Clear Output"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="w-full h-64 bg-black/60 border border-white/10 p-4 rounded-xl font-mono text-sm overflow-auto whitespace-pre-wrap text-neon-cyan/80">
            {isProcessing ? "Analyzing input signatures..." : (output || "Waiting for signal...")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

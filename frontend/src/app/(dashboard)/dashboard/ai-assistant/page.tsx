"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  MessageSquare,
  Sparkles,
  Loader2,
  User,
  Bot,
  Paperclip,
  X,
  FileText
} from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  metadata?: {
    jobSuggestions?: string[];
    resources?: string[];
    actionItems?: string[];
  };
}

interface Conversation {
  conversationId: string;
  preview: string;
  messageCount: number;
  updatedAt: string;
}

export default function AIAssistantPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, content: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadConversations();
    startNewConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentConversationId) {
      loadSuggestions();
    }
  }, [currentConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/chat/conversations", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setConversations(data.conversations);
      }
    } catch (err) {
      console.error("Failed to load conversations");
    }
  };

  const startNewConversation = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/chat/conversation", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setCurrentConversationId(data.conversationId);
        setMessages(data.messages);
        loadConversations();
      }
    } catch (err: any) {
      setError("Failed to start conversation");
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = async (conversationId: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/chat/conversation/${conversationId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setCurrentConversationId(conversationId);
        setMessages(data.conversation.messages);
      }
    } catch (err) {
      setError("Failed to load conversation");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSuggestions = async () => {
    if (!currentConversationId) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/chat/suggestions/${currentConversationId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error("Failed to load suggestions");
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !currentConversationId) return;

    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      // Include uploaded file content in the message context
      let messageWithContext = content;
      if (uploadedFiles.length > 0) {
        messageWithContext = `[Context: User has uploaded ${uploadedFiles.length} PDF file(s)]\n\n`;
        uploadedFiles.forEach((file, index) => {
          messageWithContext += `--- File ${index + 1}: ${file.name} ---\n${file.content}\n\n`;
        });
        messageWithContext += `User Question: ${content}`;
      }
      
      const response = await fetch("http://localhost:5000/api/chat/message", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          conversationId: currentConversationId,
          message: messageWithContext
        })
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        
        // Auto-speak if enabled
        if (autoSpeak && data.message.content) {
          speakText(data.message.content);
        }
        
        loadSuggestions();
        loadConversations();
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecording = async () => {
    try {
      // Use Web Speech API if available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsRecording(true);
          setError("");
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setError("Voice recognition failed");
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } else {
        setError("Voice recognition not supported in this browser");
      }
    } catch (err) {
      setError("Microphone access denied");
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/chat/conversation/${conversationId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (conversationId === currentConversationId) {
        startNewConversation();
      }
      loadConversations();
    } catch (err) {
      setError("Failed to delete conversation");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      for (const file of Array.from(files)) {
        if (file.type !== 'application/pdf') {
          setError("Only PDF files are supported");
          continue;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          setError("File size must be less than 10MB");
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/chat/upload-pdf", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });

        const data = await response.json();
        if (data.success) {
          setUploadedFiles(prev => [...prev, {
            name: file.name,
            content: data.text
          }]);
          
          // Add a system message
          const systemMessage: Message = {
            role: 'assistant',
            content: `📄 PDF "${file.name}" uploaded successfully! You can now ask me questions about this document.`,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, systemMessage]);
        } else {
          throw new Error(data.message);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload PDF");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex gap-6">
      {/* Sidebar - Conversations */}
      <div className="w-80 flex flex-col gap-4">
        <GlassCard className="p-4">
          <AnimatedButton
            onClick={startNewConversation}
            icon={<Plus className="w-5 h-5" />}
            className="w-full"
          >
            New Conversation
          </AnimatedButton>
        </GlassCard>

        <GlassCard className="flex-1 overflow-y-auto p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Chats
          </h3>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <motion.div
                key={conv.conversationId}
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  conv.conversationId === currentConversationId
                    ? 'bg-blue-500/20 border border-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => loadConversation(conv.conversationId)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{conv.preview}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {conv.messageCount} messages
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.conversationId);
                    }}
                    className="p-1 hover:bg-red-500/20 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <GlassCard className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold">AI Assistant</h2>
                <p className="text-xs text-gray-400">Your intelligent problem-solving companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoSpeak(!autoSpeak)}
                className={`p-2 rounded-lg transition-colors ${
                  autoSpeak ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5'
                }`}
                title="Auto-speak responses"
              >
                {autoSpeak ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white/10'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {message.metadata?.jobSuggestions && message.metadata.jobSuggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-sm font-semibold mb-2">💼 Job Suggestions:</p>
                        <div className="space-y-1">
                          {message.metadata.jobSuggestions.map((job, i) => (
                            <div key={i} className="text-sm text-gray-300">• {job}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => speakText(message.content)}
                        className="mt-2 text-xs text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        Listen
                      </button>
                    )}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && messages.length > 1 && (
            <div className="px-4 py-2 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            {error && (
              <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            
            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-500/20 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={uploadedFiles.length > 0 
                    ? "Ask questions about the uploaded PDF..." 
                    : "Ask me anything... programming, math, writing, career advice, or any question!"
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                {/* File Upload Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-white/5 hover:bg-purple-500/20 rounded-xl transition-colors"
                  disabled={isLoading || isUploading}
                  title="Upload PDF"
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Paperclip className="w-5 h-5" />
                  )}
                </button>
                
                {!isRecording ? (
                  <button
                    onClick={startVoiceRecording}
                    className="p-3 bg-white/5 hover:bg-blue-500/20 rounded-xl transition-colors"
                    disabled={isLoading}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceRecording}
                    className="p-3 bg-red-500/20 rounded-xl animate-pulse"
                  >
                    <MicOff className="w-5 h-5 text-red-400" />
                  </button>
                )}
                
                <AnimatedButton
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  icon={<Send className="w-5 h-5" />}
                  className="!p-3"
                >
                  Send
                </AnimatedButton>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-2 text-center">
              📎 Upload PDFs • 🎤 Voice input • Press Enter to send
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

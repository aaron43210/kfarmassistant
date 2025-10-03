import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send, Loader2, Sparkles, Paperclip, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: language === 'en' ? 'Invalid file type' : 'അസാധുവായ ഫയൽ തരം',
          description: language === 'en' ? 'Please upload only images' : 'ദയവായി ചിത്രങ്ങൾ മാത്രം അപ്‌ലോഡ് ചെയ്യുക',
          variant: 'destructive',
        });
        continue;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: language === 'en' ? 'File too large' : 'ഫയൽ വളരെ വലുതാണ്',
          description: language === 'en' ? 'Maximum file size is 5MB' : 'പരമാവധി ഫയൽ വലുപ്പം 5MB ആണ്',
          variant: 'destructive',
        });
        continue;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setUploadedImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && uploadedImages.length === 0) || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input || (language === 'en' ? 'What do you see in this image?' : 'ഈ ചിത്രത്തിൽ നിങ്ങൾ എന്താണ് കാണുന്നത്?'),
      images: uploadedImages.length > 0 ? uploadedImages : undefined
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const imagesToSend = uploadedImages;
    setUploadedImages([]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('farming-chat', {
        body: { 
          messages: [...messages, userMessage],
          images: imagesToSend
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        title: t('chatbot.error'),
        description: error.message || 'Failed to get response',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Pulse Ring Animation */}
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
          
          {/* Main Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <div className="flex flex-col items-center gap-0.5">
              <MessageCircle className="h-7 w-7" />
              <Sparkles className="h-3 w-3 absolute top-3 right-3 animate-pulse" />
            </div>
          </Button>
          
          {/* Tooltip Label */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <p className="text-sm font-medium text-foreground">
              {language === 'en' ? '💬 Ask Farming Questions' : '💬 കൃഷി ചോദ്യങ്ങൾ ചോദിക്കൂ'}
            </p>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card border-2 border-primary/20 rounded-2xl shadow-2xl z-50 flex flex-col animate-scale-in overflow-hidden">
          {/* Header with Gradient */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">{t('chatbot.title')}</h3>
                <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {language === 'en' ? 'Online' : 'ഓൺലൈൻ'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-muted/30" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-12 animate-fade-in">
                <div className="relative inline-block mb-4">
                  <MessageCircle className="h-16 w-16 mx-auto text-primary/50" />
                  <Sparkles className="h-6 w-6 absolute -top-1 -right-1 text-primary animate-pulse" />
                </div>
                <p className="text-sm font-medium mb-2">{t('chatbot.welcome')}</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4 px-4">
                  <button
                    onClick={() => setInput(language === 'en' ? 'What crops grow best in Kerala?' : 'കേരളത്തിൽ ഏത് വിളകളാണ് നന്നായി വളരുന്നത്?')}
                    className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {language === 'en' ? '🌾 Best crops?' : '🌾 മികച്ച വിളകൾ?'}
                  </button>
                  <button
                    onClick={() => setInput(language === 'en' ? 'How to control pests naturally?' : 'സ്വാഭാവികമായി കീടങ്ങളെ നിയന്ത്രിക്കുന്നത് എങ്ങനെ?')}
                    className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {language === 'en' ? '🐛 Pest control?' : '🐛 കീട നിയന്ത്രണം?'}
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-br-sm'
                        : 'bg-card border border-border text-foreground rounded-bl-sm'
                    }`}
                  >
                    {message.images && message.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {message.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`Uploaded ${imgIndex + 1}`}
                            className="max-w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Thinking...' : 'ചിന്തിക്കുന്നു...'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background">
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 p-2 bg-muted rounded-lg">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`Upload ${index + 1}`} className="h-16 w-16 object-cover rounded" />
                    <button
                      onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 h-5 w-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 flex-shrink-0"
                disabled={isLoading}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                disabled={isLoading}
                className="flex-1 rounded-full border-2 focus:border-primary"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || (!input.trim() && uploadedImages.length === 0)}
                size="icon"
                className="rounded-full h-10 w-10 bg-gradient-to-r from-primary to-primary/90 hover:scale-105 transition-transform flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {language === 'en' ? 'AI Assistant • Powered by Gemini' : 'AI സഹായി • Gemini ആണ് നൽകുന്നത്'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Loader2, Copy, CheckCircle2, Sparkles, Code, FileText, Settings2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [benefits, setBenefits] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Chuyên nghiệp, đáng tin cậy');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultMarkdown, setResultMarkdown] = useState('');
  const [resultHtml, setResultHtml] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !features.trim()) {
      setError('Vui lòng nhập ít nhất Tên sản phẩm và Tính năng chính.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setResultMarkdown('');
    setResultHtml('');
    setCopied(false);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Không tìm thấy API Key. Vui lòng cấu hình GEMINI_API_KEY.');
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Bạn là một chuyên gia Copywriter E-commerce và chuyên gia SEO hàng đầu.
Nhiệm vụ của bạn là viết một mô tả sản phẩm chi tiết, hấp dẫn và chuẩn SEO dựa trên các thông tin sau:

- Tên sản phẩm: ${productName}
- Các tính năng chính: ${features}
- Lợi ích chính cho khách hàng: ${benefits}
- Từ khóa SEO mục tiêu: ${keywords}
- Phong cách viết: ${tone}

Yêu cầu đầu ra:
1. Viết bằng tiếng Việt, giọng văn ${tone.toLowerCase()}, thuyết phục và kích thích mua hàng.
2. Bắt đầu bằng một tiêu đề hấp dẫn (H2 hoặc H3).
3. Một đoạn mở đầu ngắn gọn thu hút sự chú ý của khách hàng, nêu bật vấn đề họ đang gặp phải và cách sản phẩm giải quyết.
4. Danh sách các tính năng nổi bật (sử dụng bullet points), giải thích rõ tính năng đó mang lại lợi ích gì.
5. Một đoạn văn bản nhấn mạnh lợi ích tổng thể và giá trị cốt lõi.
6. Tích hợp khéo léo và tự nhiên các từ khóa SEO mục tiêu vào bài viết (không nhồi nhét).
7. Kết thúc bằng một lời kêu gọi hành động (Call to Action - CTA) mạnh mẽ.
8. Định dạng kết quả bằng Markdown chuẩn. Không bao gồm các thẻ HTML trong kết quả Markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const markdownText = response.text || '';
      setResultMarkdown(markdownText);
      
      // Generate HTML version
      const htmlPrompt = `Chuyển đổi đoạn văn bản Markdown sau thành mã HTML sạch (chỉ dùng các thẻ cơ bản như <h2>, <h3>, <p>, <ul>, <li>, <strong>). Không bao gồm thẻ <html>, <head> hay <body>. Không sử dụng markdown code block (như \`\`\`html). Chỉ trả về mã HTML thuần túy:

${markdownText}`;
      
      const htmlResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: htmlPrompt,
      });
      
      let htmlText = htmlResponse.text || '';
      htmlText = htmlText.replace(/^```html\n/, '').replace(/\n```$/, '');
      setResultHtml(htmlText);

    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'Đã xảy ra lỗi trong quá trình tạo mô tả. Vui lòng thử lại.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = viewMode === 'preview' ? resultMarkdown : resultHtml;
    if (!textToCopy) return;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              E-com DescGen AI
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-500 hidden sm:block">
            Tạo mô tả sản phẩm chuẩn SEO
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                Thông tin sản phẩm
              </h2>
              
              <form onSubmit={handleGenerate} className="space-y-5">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label htmlFor="productName" className="block text-sm font-medium text-slate-700">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="productName"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="VD: Tai nghe Bluetooth Sony WH-1000XM5"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    required
                  />
                </div>

                {/* Features */}
                <div className="space-y-1.5">
                  <label htmlFor="features" className="block text-sm font-medium text-slate-700">
                    Tính năng chính <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="features"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="VD: Chống ồn chủ động (ANC), Pin 30 giờ, Sạc nhanh 3 phút được 3 giờ nghe..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none"
                    required
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-1.5">
                  <label htmlFor="benefits" className="block text-sm font-medium text-slate-700">
                    Lợi ích cho khách hàng
                  </label>
                  <textarea
                    id="benefits"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    placeholder="VD: Tập trung làm việc không bị làm phiền, thoải mái đeo cả ngày dài..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* SEO Keywords & Tone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="keywords" className="block text-sm font-medium text-slate-700">
                      Từ khóa SEO
                    </label>
                    <input
                      id="keywords"
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="VD: tai nghe chống ồn..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="tone" className="block text-sm font-medium text-slate-700 flex items-center gap-1">
                      <Settings2 className="w-4 h-4 text-slate-500" />
                      Phong cách viết
                    </label>
                    <select
                      id="tone"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 appearance-none cursor-pointer"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                    >
                      <option value="Chuyên nghiệp, đáng tin cậy">Chuyên nghiệp</option>
                      <option value="Hấp dẫn, kích thích mua hàng">Kích thích mua hàng</option>
                      <option value="Sang trọng, cao cấp">Sang trọng, cao cấp</option>
                      <option value="Gần gũi, thân thiện">Gần gũi, thân thiện</option>
                      <option value="Hài hước, sáng tạo">Hài hước, sáng tạo</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang tạo mô tả...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Tạo Mô Tả Sản Phẩm
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full min-h-[600px] flex flex-col transition-all duration-300 hover:shadow-md overflow-hidden">
              
              {/* Result Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex bg-slate-200/70 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('preview')}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                      viewMode === 'preview' 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    )}
                  >
                    <FileText className="w-4 h-4" />
                    Xem trước
                  </button>
                  <button
                    onClick={() => setViewMode('html')}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                      viewMode === 'html' 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    )}
                  >
                    <Code className="w-4 h-4" />
                    Mã HTML
                  </button>
                </div>

                <button
                  onClick={handleCopy}
                  disabled={!resultMarkdown && !resultHtml}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  title="Sao chép nội dung"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>

              {/* Result Content */}
              <div className="flex-1 p-6 overflow-y-auto bg-white">
                {!resultMarkdown && !isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Sparkles className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-center max-w-sm">
                      Điền thông tin sản phẩm và nhấn "Tạo Mô Tả" để AI viết nội dung cho bạn.
                    </p>
                  </div>
                ) : isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-indigo-500 space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <p className="font-medium animate-pulse">AI đang sáng tạo nội dung...</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500">
                    {viewMode === 'preview' ? (
                      <div className="prose prose-slate prose-indigo max-w-none prose-headings:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-li:marker:text-indigo-400">
                        <ReactMarkdown>{resultMarkdown}</ReactMarkdown>
                      </div>
                    ) : (
                      <pre className="bg-slate-800 text-slate-50 p-4 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed shadow-inner whitespace-pre-wrap">
                        <code>{resultHtml}</code>
                      </pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}


import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 优化的麦克斯韦方程组组件 - 更优雅的视觉效果
const MaxwellEquations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 主方程组 - 左侧优雅展示 */}
      <div className="absolute top-24 left-6 md:left-12 lg:left-20 text-white/15 font-mono text-xs md:text-sm lg:text-base">
        <div className="space-y-3 backdrop-blur-sm bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 group hover:text-blue-300/50 transition-colors duration-500">
            <span className="text-blue-400/60">∇</span>
            <span className="text-white/30">·</span>
            <span className="text-cyan-300/60">E</span>
            <span className="text-white/30">=</span>
            <span className="text-white/40">ρ/ε₀</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-blue-300/50 transition-colors duration-500">
            <span className="text-blue-400/60">∇</span>
            <span className="text-white/30">·</span>
            <span className="text-cyan-300/60">B</span>
            <span className="text-white/30">=</span>
            <span className="text-white/40">0</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-blue-300/50 transition-colors duration-500">
            <span className="text-blue-400/60">∇</span>
            <span className="text-white/30">×</span>
            <span className="text-cyan-300/60">E</span>
            <span className="text-white/30">=</span>
            <span className="text-white/40">-∂B/∂t</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-blue-300/50 transition-colors duration-500">
            <span className="text-blue-400/60">∇</span>
            <span className="text-white/30">×</span>
            <span className="text-cyan-300/60">B</span>
            <span className="text-white/30">=</span>
            <span className="text-yellow-300/40">μ₀J</span>
            <span className="text-white/30">+</span>
            <span className="text-white/40">μ₀ε₀∂E/∂t</span>
          </div>
        </div>
      </div>

      {/* 装饰性公式 - 右上角 */}
      <div className="absolute top-32 right-10 md:right-20 text-white/8 font-mono text-lg md:text-xl lg:text-2xl rotate-12">
        <div className="backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          <span className="text-blue-300/30">∇²</span>
          <span className="text-cyan-300/30">E</span>
          <span className="text-white/20">=</span>
          <span className="text-white/20">με∂²E/∂t²</span>
        </div>
      </div>

      {/* 装饰性公式 - 右下角 */}
      <div className="absolute bottom-48 right-16 md:right-32 text-white/8 font-mono text-sm md:text-base -rotate-6">
        <div className="backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/5">
          <span className="text-cyan-300/30">c</span>
          <span className="text-white/20">=</span>
          <span className="text-white/20">1/√(μ₀ε₀)</span>
        </div>
      </div>

      {/* 装饰性公式 - 左下角 */}
      <div className="absolute bottom-64 left-16 md:left-32 text-white/8 font-mono text-sm md:text-base rotate-3">
        <div className="backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/5">
          <span className="text-yellow-300/30">λ</span>
          <span className="text-white/20">=</span>
          <span className="text-cyan-300/30">c</span>
          <span className="text-white/20">/</span>
          <span className="text-blue-300/30">f</span>
        </div>
      </div>

      {/* 波动的电磁波示意 - 背景装饰 */}
      <div className="absolute top-1/2 left-1/4 text-white/5 font-mono text-6xl md:text-8xl font-bold select-none">
        <span className="text-blue-400/10">E</span>
        <span className="text-white/10">×</span>
        <span className="text-cyan-400/10">B</span>
      </div>
    </div>
  );
};

// 优化的电磁波可视化Canvas
const ElectromagneticWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const amplitude = height / 8;
      const frequency = 0.015;
      const speed = 0.03;

      // 绘制渐变背景
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, centerY - amplitude * 2, width, amplitude * 4);

      // 绘制电场 (蓝色) - 正弦波
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
      ctx.shadowBlur = 10;

      for (let x = 0; x < width; x += 2) {
        const y = centerY + amplitude * Math.sin(frequency * x - time * speed);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 绘制电场填充
      ctx.beginPath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      for (let x = 0; x < width; x += 2) {
        const y = centerY + amplitude * Math.sin(frequency * x - time * speed);
        if (x === 0) {
          ctx.moveTo(x, centerY);
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineTo(width, centerY);
      ctx.closePath();
      ctx.fill();

      // 绘制磁场 (青色) - 余弦波
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.9)';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
      ctx.shadowBlur = 10;

      for (let x = 0; x < width; x += 2) {
        const y = centerY + amplitude * Math.cos(frequency * x - time * speed);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 绘制磁场填充
      ctx.beginPath();
      ctx.fillStyle = 'rgba(34, 211, 238, 0.1)';
      for (let x = 0; x < width; x += 2) {
        const y = centerY + amplitude * Math.cos(frequency * x - time * speed);
        if (x === 0) {
          ctx.moveTo(x, centerY);
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineTo(width, centerY);
      ctx.closePath();
      ctx.fill();

      // 绘制传播方向箭头
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([15, 15]);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // 绘制方向箭头
      const arrowX = width - 40;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.moveTo(arrowX + 15, centerY);
      ctx.lineTo(arrowX, centerY - 6);
      ctx.lineTo(arrowX, centerY + 6);
      ctx.closePath();
      ctx.fill();

      // 标注文字
      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.fillText('E (电场)', 20, centerY - amplitude - 15);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';
      ctx.fillText('B (磁场)', 20, centerY + amplitude + 25);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('传播方向 →', width - 100, centerY + 25);

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 right-0 h-40 md:h-56 w-full opacity-70"
    />
  );
};

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 多层背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />

      {/* 优化的麦克斯韦方程组背景 */}
      <MaxwellEquations />

      {/* 优化的电磁波可视化 */}
      <ElectromagneticWave />

      {/* 内容 */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_0.8fr] items-center px-6 sm:px-12 lg:px-20">
        {/* 左侧内容 */}
        <div className="flex flex-col justify-center py-20 lg:py-0">
          <div className="space-y-6">
            {/* 徽章 */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Waves className="w-4 h-4 text-blue-400" />
              <span className="text-white/80 text-sm">航天科工集团 · 微波技术</span>
            </div>

            {/* 标题 */}
            <h1
              className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms', transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <span className="block overflow-hidden">
                <span className="inline-block">驾驭电磁波</span>
              </span>
              <span className="block overflow-hidden mt-2">
                <span className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  连接天地
                </span>
              </span>
            </h1>

            {/* 副标题 */}
            <p
              className={`text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              以麦克斯韦方程组为理论基础，专注于微波技术研发与应用，
              为航天事业提供先进的射频与微波解决方案。
            </p>

            {/* CTA 按钮 */}
            <div
              className={`pt-4 flex flex-wrap gap-4 transition-all duration-600 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: '900ms', transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
            >
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-full animate-pulse-glow group transition-all duration-300"
                onClick={() => scrollToSection('about')}
              >
                探索技术
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-[-45deg]" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                onClick={() => scrollToSection('projects')}
              >
                查看产品
              </Button>
            </div>
          </div>
        </div>

        {/* 右侧内容 - 微波可视化 */}
        <div
          className={`relative hidden lg:flex items-center justify-center transition-all duration-1200 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
          }`}
          style={{
            transitionDelay: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
            perspective: '1000px'
          }}
        >
          <div className="relative animate-float">
            {/* 多层光晕效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-40 blur-3xl rounded-full scale-90 animate-pulse" />
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-blue-600/20 blur-2xl rounded-full" />

            {/* 主视觉区域 */}
            <div className="relative z-10 w-full max-w-md xl:max-w-lg aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800/50 to-black/50 backdrop-blur-sm"
              style={{
                transform: 'rotateY(-8deg) rotateX(5deg)',
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)'
              }}
            >
              {/* 内部内容 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 flex items-center justify-center border border-white/20">
                      <svg viewBox="0 0 100 100" className="w-24 h-24">
                        <defs>
                          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 50 Q 25 10, 40 50 T 70 50 T 100 50"
                          fill="none"
                          stroke="url(#waveGrad)"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        <path
                          d="M 10 60 Q 25 20, 40 60 T 70 60 T 100 60"
                          fill="none"
                          stroke="url(#waveGrad)"
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        />
                        <path
                          d="M 10 70 Q 25 30, 40 70 T 70 70 T 100 70"
                          fill="none"
                          stroke="url(#waveGrad)"
                          strokeWidth="2"
                          opacity="0.4"
                          className="animate-pulse"
                          style={{ animationDelay: '1s' }}
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-white font-display text-xl font-bold mb-2">电磁波谱</h3>
                  <p className="text-white/60 text-sm">从射频到毫米波</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-blue-400 font-mono text-lg font-bold">1-40</div>
                      <div className="text-white/40 text-xs">GHz</div>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-cyan-400 font-mono text-lg font-bold">X-Ka</div>
                      <div className="text-white/40 text-xs">波段</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 网格装饰 */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              />
            </div>

            {/* 频率标签 */}
            <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-blue-400 font-mono text-sm">f = 1-40 GHz</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

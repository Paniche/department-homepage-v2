import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'X波段相控阵雷达',
    category: '雷达系统',
    description: '高分辨率相控阵雷达前端',
    specs: ['8-12 GHz', '256单元', '数字波束形成']
  },
  {
    title: 'Ka波段卫星通信终端',
    category: '卫星通信',
    description: '高通量卫星用户终端',
    specs: ['27-40 GHz', '1Gbps', '轻量化设计']
  },
  {
    title: '宽带数字接收机',
    category: '信号处理',
    description: '超宽带数字化接收系统',
    specs: ['2-18 GHz', '14bit ADC', '实时处理']
  },
  {
    title: '低轨卫星通信载荷',
    category: '卫星通信',
    description: '星载通信收发模块',
    specs: ['多频段', '高可靠', '长寿命']
  },
  {
    title: '毫米波成像系统',
    category: '安防应用',
    description: '主动毫米波人体安检',
    specs: ['W波段', '高分辨', '实时成像']
  },
  {
    title: '5G毫米波基站',
    category: '通信系统',
    description: '5G毫米波基站前端',
    specs: ['28/39 GHz', 'Massive MIMO', '波束跟踪']
  }
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute bottom-20 right-10 opacity-5 text-slate-900 font-mono text-3xl rotate-[-10deg] select-none">
        ∇²E = μ₀ε₀∂²E/∂t²
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* 标题 */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-blue-500 font-medium text-sm tracking-wider uppercase">
              Our Products
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              产品展示
            </h2>
          </div>
          <div
            className={`mt-6 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-slate-600 text-lg">
              自主研发的系列化微波产品，广泛应用于航天国防领域
            </p>
          </div>
        </div>

        {/* 产品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative rounded-2xl overflow-hidden bg-slate-900 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transform: isVisible ? `translateY(${index % 2 === 1 ? '20px' : '0'})` : 'translateY(40px)'
              }}
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 内容 */}
              <div className="relative p-6 h-full flex flex-col">
                {/* 分类标签 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* 标题和描述 */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* 规格标签 */}
                <div className="flex flex-wrap gap-2">
                  {project.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 text-xs rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* 悬停指示器 */}
                <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Target, Users, Lightbulb, Rocket } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: '精准定位',
    description: '专注于微波射频领域，为航天国防提供关键技术支撑'
  },
  {
    icon: Users,
    title: '专业团队',
    description: '汇聚行业精英，拥有丰富的研发经验和创新能力'
  },
  {
    icon: Lightbulb,
    title: '技术创新',
    description: '持续突破核心技术，引领微波技术发展方向'
  },
  {
    icon: Rocket,
    title: '航天品质',
    description: '严格的质量管理体系，确保产品可靠性'
  }
];

export default function About() {
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
      id="about"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute top-20 right-20 opacity-5 text-slate-900 font-mono text-6xl rotate-12 select-none">
        ∇ × E
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 text-slate-900 font-mono text-4xl -rotate-6 select-none">
        ∇ · B = 0
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-blue-500 font-medium text-sm tracking-wider uppercase">
              About Us
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              关于微波室
            </h2>
          </div>
          <div
            className={`mt-6 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-slate-600 text-lg leading-relaxed">
              我们是航天科工集团旗下专业从事微波技术研发的核心部门，致力于为我国航天事业提供先进的微波与射频解决方案。
              凭借深厚的技术积累和持续的创新能力，我们在相控阵天线、微波组件等领域处于国内领先水平。
            </p>
          </div>
        </div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 数据统计 */}
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { value: '20+', label: '年研发经验' },
            { value: '100+', label: '项专利成果' },
            { value: '50+', label: '人专业团队' },
            { value: '30+', label: '个型号配套' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

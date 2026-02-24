import { useEffect, useRef, useState } from 'react';
import { Radio, Wifi, Satellite, Radar, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: Radio,
    title: '射频组件',
    description: '高性能放大器、混频器、滤波器等微波组件研发',
    features: ['低噪声放大器', '功率放大器', '混频器', '滤波器']
  },
  {
    icon: Wifi,
    title: '天线系统',
    description: '相控阵天线、微带天线设计制造',
    features: ['有源相控阵', '微带阵列', '喇叭天线', '共形天线']
  },
  {
    icon: Satellite,
    title: '卫星通信',
    description: '卫星通信载荷、地面接收系统',
    features: ['通信载荷', '馈电网络', '频率合成', '信号处理']
  },
  {
    icon: Radar,
    title: '雷达系统',
    description: '雷达前端、信号处理模块',
    features: ['雷达前端', 'T/R组件', '波束控制', '目标识别']
  },
  {
    icon: Zap,
    title: '微波测试',
    description: '专业的微波测试与测量服务',
    features: ['S参数测试', '功率测试', '频谱分析', '环境试验']
  },
  {
    icon: Shield,
    title: '可靠性保障',
    description: '航天级可靠性设计与验证',
    features: ['可靠性设计', '环境试验', '寿命评估', '失效分析']
  }
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
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
      id="services"
      className="relative py-24 md:py-32 bg-slate-50 overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute top-10 left-10 opacity-5 text-slate-900 font-mono text-4xl select-none">
        E = E₀e^(i(k·r-ωt))
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
              Our Services
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              技术服务
            </h2>
          </div>
          <div
            className={`mt-6 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-slate-600 text-lg">
              提供从设计到测试的全链条微波技术服务
            </p>
          </div>
        </div>

        {/* 服务网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative p-6 rounded-2xl bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-blue-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${activeService === index ? 'ring-2 ring-blue-500' : ''}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-110">
                  <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

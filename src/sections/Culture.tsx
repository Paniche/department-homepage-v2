import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: '在这里，每一个创意都能得到尊重，每一次尝试都是成长。',
    author: '张工程师',
    role: '天线设计专家',
    years: '入职5年'
  },
  {
    quote: '团队的凝聚力让我感动，我们一起攻克了一个又一个技术难题。',
    author: '李博士',
    role: '射频工程师',
    years: '入职3年'
  },
  {
    quote: '航天报国的使命感，让每一天的工作都充满意义。',
    author: '王高工',
    role: '项目负责人',
    years: '入职8年'
  }
];

const values = [
  {
    title: '创新驱动',
    description: '持续创新，追求卓越'
  },
  {
    title: '团队协作',
    description: '协同攻坚，共创佳绩'
  },
  {
    title: '精益求精',
    description: '严谨细致，追求极致'
  },
  {
    title: '航天报国',
    description: '为国铸剑，使命必达'
  }
];

export default function Culture() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture"
      className="relative py-24 md:py-32 bg-slate-900 overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute top-40 left-10 opacity-5 text-white font-mono text-xl rotate-[-5deg] select-none">
        P = |E|²/2η
      </div>

      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        {/* 标题 */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-blue-400 font-medium text-sm tracking-wider uppercase">
              Our Culture
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              部门文化
            </h2>
          </div>
        </div>

        {/* 价值观 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-slate-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        {/* 员工心声轮播 */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10 backdrop-blur-sm">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-blue-400/30" />

            <div className="relative h-32">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-10'
                  }`}
                >
                  <p className="text-xl md:text-2xl text-white font-light italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role} · {testimonial.years}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 轮播指示器 */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-blue-400' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Radio, Mail, Phone, MapPin } from 'lucide-react';

const links = {
  navigation: [
    { name: '首页', href: '#home' },
    { name: '关于', href: '#about' },
    { name: '技术', href: '#services' },
    { name: '产品', href: '#projects' },
    { name: '文化', href: '#culture' },
  ],
  services: [
    { name: '射频组件', href: '#services' },
    { name: '天线系统', href: '#services' },
    { name: '卫星通信', href: '#services' },
    { name: '雷达系统', href: '#services' },
  ],
  contact: [
    { icon: Mail, text: 'contact@microwave.lab' },
    { icon: Phone, text: '+86 xxx-xxxx-xxxx' },
    { icon: MapPin, text: '北京市xx区xx路xx号' },
  ]
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative bg-slate-950 pt-20 pb-8 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 right-20 opacity-5 text-white font-mono text-lg select-none">
        <div>∇ × E = -∂B/∂t</div>
        <div>∇ × B = μ₀J + μ₀ε₀∂E/∂t</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-white font-display text-xl font-bold">微波室</div>
                <div className="text-slate-500 text-xs">航天科工集团</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              专注于微波技术研发，为航天事业提供先进的射频与微波解决方案。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2">
              {links.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">技术服务</h4>
            <ul className="space-y-2">
              {links.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">联系我们</h4>
            <ul className="space-y-3">
              {links.contact.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-400 text-sm">
                  <item.icon className="w-4 h-4 text-blue-400" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 微波室 · 航天科工集团. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                使用条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

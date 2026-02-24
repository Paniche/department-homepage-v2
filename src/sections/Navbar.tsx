import { useState, useEffect } from 'react';
import { Menu, X, Radio, LayoutDashboard, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navLinks = [
  { name: '首页', href: '#home' },
  { name: '关于', href: '#about' },
  { name: '技术', href: '#services' },
  { name: '产品', href: '#projects' },
  { name: '文化', href: '#culture' },
];

// API 接口配置
const API_ENDPOINTS = {
  login: '/api/v1/auth/login',
  workbench: '/workbench',
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // 处理工作台点击 - 预留API接口
  const handleWorkbenchClick = () => {
    console.log('跳转工作台:', API_ENDPOINTS.workbench);
    alert('工作台功能开发中，API接口已预留：' + API_ENDPOINTS.workbench);
  };

  // 处理登录提交 - 预留API接口
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('登录请求:', API_ENDPOINTS.login, loginForm);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('登录功能开发中，API接口已预留：' + API_ENDPOINTS.login);
      setIsLoginOpen(false);
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm h-[70px]'
          : 'bg-transparent h-[90px]'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className={`flex items-center gap-2 transition-all duration-600 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            <Radio
              className={`w-8 h-8 transition-colors duration-300 ${
                isScrolled ? 'text-space-blue' : 'text-space-blue'
              }`}
            />
            <div className="flex flex-col">
              <span
                className={`font-display text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-space-black' : 'text-white'
                }`}
              >
                微波室
              </span>
              <span
                className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-space-gray' : 'text-white/70'
                }`}
              >
                航天科工集团
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className={`relative text-sm font-medium transition-all duration-500 link-underline ${
                  isScrolled ? 'text-space-gray hover:text-space-blue' : 'text-white/90 hover:text-white'
                } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
                style={{
                  transitionDelay: `${100 + index * 100}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={`transition-all duration-500 ${
                isScrolled
                  ? 'text-space-gray hover:text-space-blue hover:bg-space-blue/10'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
              style={{
                transitionDelay: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onClick={handleWorkbenchClick}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              工作台
            </Button>

            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-all duration-500 ${
                    isScrolled
                      ? 'text-space-gray hover:text-space-blue hover:bg-space-blue/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
                  style={{
                    transitionDelay: '700ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  登录
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Radio className="w-6 h-6 text-space-blue" />
                    微波室登录
                  </DialogTitle>
                  <DialogDescription>
                    请输入您的账号和密码访问研发管理平台
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLoginSubmit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      placeholder="请输入用户名"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="请输入密码"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <a href="#" className="text-space-blue hover:underline">忘记密码?</a>
                    <a href="#" className="text-space-blue hover:underline">注册账号</a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-space-blue hover:bg-space-blue-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? '登录中...' : '登录'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              className={`bg-space-blue hover:bg-space-blue-dark text-white rounded-full px-6 transition-all duration-300 hover:shadow-glow ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                transitionDelay: '800ms',
                transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              }}
              onClick={() => scrollToSection('#contact')}
            >
              联系我们
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-space-black' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-space-black' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="block text-space-gray hover:text-space-blue font-medium transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <hr className="border-gray-200" />
          <button
            onClick={handleWorkbenchClick}
            className="flex items-center gap-2 w-full text-left text-space-gray hover:text-space-blue font-medium transition-colors duration-300"
          >
            <LayoutDashboard className="w-4 h-4" />
            工作台
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsLoginOpen(true);
            }}
            className="flex items-center gap-2 w-full text-left text-space-gray hover:text-space-blue font-medium transition-colors duration-300"
          >
            <LogIn className="w-4 h-4" />
            登录
          </button>
          <Button
            className="w-full bg-space-blue hover:bg-space-blue-dark text-white rounded-full"
            onClick={() => scrollToSection('#contact')}
          >
            联系我们
          </Button>
        </div>
      </div>
    </nav>
  );
}

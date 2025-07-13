'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImageEditor } from '@/components/image-editor'
import { Shield, Download, Palette, Smartphone, Zap, Eye, Settings, Globe, Upload } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomePage() {
  const [showEditor, setShowEditor] = useState(false)
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
  const { t, mounted } = useLanguage()

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  const scrollToHowTo = () => {
    const howToSection = document.getElementById('how-to-section')
    if (howToSection) {
      howToSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 在组件完全挂载前，使用默认的英文文本，防止水合不匹配
  const getText = (key: string) => {
    if (!mounted) {
      // 返回默认的英文文本
      const defaultTexts: Record<string, string> = {
        'home.hero.title': 'ImageCircleMaker',
        'home.hero.subtitle': 'Free Online Circle Avatar Maker',
        'home.hero.description': 'Professional circle avatar cropping tool designed for social media users, supporting Instagram, LinkedIn, Facebook and 20+ platforms. All images processed locally to protect your privacy.',
        'home.hero.startButton': 'Upload Image',
        'home.whatIs.title': 'What is ImageCircleMaker?',
        'home.whatIs.subtitle': 'Professional circle avatar maker for your social media presence',
        'home.whatIs.description': 'Easily create perfect circle avatars for social media, professional platforms, or personal use.',
        'home.features.title': 'Why Choose Us?',
        'home.features.subtitle': 'Professional features, simple to use',
        'home.howTo.title': 'How to Use?',
        'home.howTo.subtitle': 'Simple three steps, easy to make',
        'home.faq.title': 'Frequently Asked Questions',
        'home.faq.subtitle': 'Answer your questions',
        'home.cta.title': 'Start Making Your Circle Avatar',
        'home.cta.subtitle': 'Experience immediately, no registration required',
        'home.cta.button': 'Start Making',
        'home.seo.title': 'About Circle Avatar Making',
        'footer.privacy': 'Privacy',
        'footer.terms': 'Terms',
        'footer.contact': 'Contact'
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  // 处理URL锚点跳转
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash === '#faq-section') {
        setTimeout(() => {
          const faqSection = document.getElementById('faq-section')
          if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else if (hash === '#how-to-section') {
        setTimeout(() => {
          const howToSection = document.getElementById('how-to-section')
          if (howToSection) {
            howToSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }, [])

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {getText('home.hero.title')}
            <span className="block text-2xl md:text-3xl font-normal text-blue-600 dark:text-blue-400 mt-2">
              {getText('home.hero.subtitle')}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {getText('home.hero.description')}
          </p>
          
          <div className="flex justify-center mb-12">
            <Button 
              onClick={() => setShowEditor(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-lg text-lg shadow-lg flex items-center gap-2 min-w-[220px]"
              size="lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              {getText('home.hero.startButton')}
            </Button>
          </div>
          {showEditor && (
            <div className="mt-8 mb-16">
              <ImageEditor />
            </div>
          )}

        </div>

        {/* What is 产品介绍区 */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{getText('home.whatIs.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{getText('home.whatIs.subtitle')}</p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {getText('home.whatIs.description')}
            </p>
          </div>
        </section>

        {/* 功能特色区 */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{getText('home.features.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{getText('home.features.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['home.features.items.0', 'home.features.items.1', 'home.features.items.2', 'home.features.items.3', 'home.features.items.4', 'home.features.items.5', 'home.features.items.6', 'home.features.items.7'].map((key, index) => {
              const icons = [Shield, Download, Palette, Smartphone, Zap, Eye, Settings, Globe]
              const colors = [
                'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
                'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
                'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
                'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
                'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
                'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
                'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
              ]
              const IconComponent = icons[index]

              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 ${colors[index]} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{mounted ? t(`${key}.title`) : key}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{mounted ? t(`${key}.description`) : ''}</p>
                </div>
              )
            })}
          </div>
        </section>
          
        {/* 完善使用教程区 */}
        <section id="how-to-section" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{getText('home.howTo.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{getText('home.howTo.subtitle')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {mounted ? t(`home.howTo.steps.${step - 1}.title`) : `步骤 ${step}`}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {mounted ? t(`home.howTo.steps.${step - 1}.description`) : ''}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq-section" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{getText('home.faq.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{getText('home.faq.subtitle')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {['home.faq.items.0', 'home.faq.items.1', 'home.faq.items.2', 'home.faq.items.3', 'home.faq.items.4', 'home.faq.items.5', 'home.faq.items.6', 'home.faq.items.7', 'home.faq.items.8'].map((key, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{mounted ? t(`${key}.question`) : `问题 ${index + 1}`}</span>
                  <span className={`text-blue-600 dark:text-blue-400 transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">{mounted ? t(`${key}.answer`) : ''}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
          
        {/* 再次CTA区 */}
        <section className="mt-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {getText('home.cta.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {getText('home.cta.subtitle')}
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => {
                  setShowEditor(true)
                  // 滚动到hero区域
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }, 100)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-lg text-lg shadow-lg flex items-center gap-2 min-w-[220px]"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                {getText('home.hero.startButton')}
              </Button>
            </div>
          </div>
        </section>

        {/* SEO文本区块 */}
        <section className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{getText('home.seo.title')}</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              {['home.seo.content.0', 'home.seo.content.1', 'home.seo.content.2', 'home.seo.content.3'].map((key, index) => (
                <p key={index}>
                  {mounted ? t(key) : ''}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
      

      
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ImageCircleMaker. All rights reserved.</p>
          <p className="mt-2 text-gray-400">{getText('home.hero.subtitle')}</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white underline" title={getText('footer.privacy')}>{getText('footer.privacy')}</a>
            <a href="/terms" className="hover:text-white underline" title={getText('footer.terms')}>{getText('footer.terms')}</a>
            <a href="/contact" className="hover:text-white underline" title={getText('footer.contact')}>{getText('footer.contact')}</a>
          </div>
        </div>
      </footer>
    </>
  )
} 
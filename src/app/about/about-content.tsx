'use client'

import { Users, Target, Heart, Zap, Globe, Award, UserCheck, Lightbulb, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function AboutContent() {
  const { t, mounted } = useLanguage()

  // 在组件完全挂载前，使用默认的英文文本，防止水合不匹配
  const getText = (key: string) => {
    if (!mounted) {
      // 返回默认的英文文本
      const defaultTexts: Record<string, string> = {
        'about.title': 'About ImageCircleMaker',
        'about.subtitle': 'We are committed to providing users with the best circle avatar making experience',
        'about.story.title': 'Our Story',
        'about.team.title': 'Professional Team',
        'about.team.description': 'We are a passionate team focused on creating simple and easy-to-use tools for users.',
        'about.mission.title': 'Our Mission',
        'about.mission.description': 'Let everyone easily create perfect circle avatars without complex technical knowledge.',
        'about.values.title': 'Our Values',
        'about.values.items.0.title': 'User First',
        'about.values.items.0.description': 'Always put user experience first',
        'about.values.items.1.title': 'Simple to Use',
        'about.values.items.1.description': 'Complex features, simple operations',
        'about.values.items.2.title': 'Free and Open',
        'about.values.items.2.description': 'Provide free tools for everyone',
        'about.values.items.3.title': 'Continuous Innovation',
        'about.values.items.3.description': 'Keep improving, pursue excellence'
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero区域 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {getText('about.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {getText('about.subtitle')}
        </p>
      </div>

      {/* 团队介绍 */}
      <section className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {getText('about.story.title')}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{mounted ? t('about.story.content.0') : '我们是一支专注于用户体验的团队，致力于为用户提供简单易用的在线工具。'}</p>
              <p>{mounted ? t('about.story.content.1') : 'ImageCircleMaker 的诞生源于我们对用户需求的深入理解。'}</p>
              <p>{mounted ? t('about.story.content.2') : '我们相信，好的工具应该是免费的、易用的、高效的。'}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{getText('about.team.title')}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              {getText('about.team.description')}
            </p>
          </div>
        </div>
      </section>

      {/* 使命愿景 */}
      <section className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{getText('about.mission.title')}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              {getText('about.mission.description')}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {mounted ? t('about.values.title') : '核心价值观'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {mounted ? t('about.values.userFirst.title') : '用户至上'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {mounted ? t('about.values.userFirst.description') : '始终将用户需求放在首位，倾听用户反馈，持续改进产品体验'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {mounted ? t('about.values.innovation.title') : '创新驱动'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {mounted ? t('about.values.innovation.description') : '拥抱新技术，追求创新，为用户提供更好的解决方案'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {mounted ? t('about.values.quality.title') : '品质保证'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {mounted ? t('about.values.quality.description') : '追求卓越品质，确保每个功能都经过精心设计和测试'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技术优势 */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          {mounted ? t('about.technology.title') : '技术优势'}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {mounted ? t('about.technology.frontend.title') : '前沿技术栈'}
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-left">
              <li>• {mounted ? t('about.technology.frontend.items.0') : '采用现代Web技术，确保最佳性能'}</li>
              <li>• {mounted ? t('about.technology.frontend.items.1') : '响应式设计，完美适配各种设备'}</li>
              <li>• {mounted ? t('about.technology.frontend.items.2') : '本地处理技术，保护用户隐私'}</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {mounted ? t('about.technology.optimization.title') : '持续优化'}
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-left">
              <li>• {mounted ? t('about.technology.optimization.items.0') : '定期更新功能，满足用户新需求'}</li>
              <li>• {mounted ? t('about.technology.optimization.items.1') : '性能监控和优化，确保流畅体验'}</li>
              <li>• {mounted ? t('about.technology.optimization.items.2') : '用户反馈驱动，快速迭代改进'}</li>
              <li>• {mounted ? t('about.technology.optimization.items.3') : '安全更新，保护用户数据'}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
} 
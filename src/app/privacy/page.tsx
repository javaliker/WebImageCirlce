'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPage() {
  const { language, t, mounted } = useLanguage()

  // 在组件完全挂载前，使用默认的英文文本
  const getText = (key: string) => {
    if (!mounted) {
      const defaultTexts: Record<string, string> = {
        'privacy.title': 'Privacy Policy',
        'privacy.description': 'Learn how ImageCircleMaker protects your privacy and data security',
        'privacy.lastUpdated': 'Last updated: December 2024',
        'privacy.sections.collection.title': '1. Information Collection',
        'privacy.sections.collection.description': 'ImageCircleMaker is committed to protecting your privacy. The information we collect includes:',
        'privacy.sections.collection.items.0': 'Usage Data: How you use our services, including feature usage and performance data',
        'privacy.sections.collection.items.1': 'Technical Information: Browser type, operating system, IP address, etc.',
        'privacy.sections.collection.items.2': 'Image Data: Your uploaded images are processed locally only and will not be uploaded to our servers',
        'privacy.sections.usage.title': '2. Information Usage',
        'privacy.sections.usage.description': 'We use the collected information for:',
        'privacy.sections.usage.items.0': 'Providing and improving our services',
        'privacy.sections.usage.items.1': 'Analyzing usage patterns to optimize user experience',
        'privacy.sections.usage.items.2': 'Detecting and preventing fraud or abuse',
        'privacy.sections.usage.items.3': 'Complying with legal obligations',
        'privacy.sections.protection.title': '3. Data Protection',
        'privacy.sections.protection.description': 'We take the following measures to protect your data:',
        'privacy.sections.protection.items.0': 'Local Processing: Your images are processed locally in your browser and will not be uploaded to servers',
        'privacy.sections.protection.items.1': 'Encrypted Transmission: All data transmission is encrypted using HTTPS',
        'privacy.sections.protection.items.2': 'Secure Storage: Server data is protected using industry-standard security measures',
        'privacy.sections.protection.items.3': 'Access Control: Strict restrictions on access to personal data',
        'privacy.sections.sharing.title': '4. Information Sharing',
        'privacy.sections.sharing.description': 'We do not sell, trade, or transfer your personal information unless:',
        'privacy.sections.sharing.items.0': 'We have your explicit consent',
        'privacy.sections.sharing.items.1': 'Required by law or government agencies',
        'privacy.sections.sharing.items.2': 'To protect our rights, property, or safety',
        'privacy.sections.cookies.title': '5. Cookie Usage',
        'privacy.sections.cookies.description': 'We use cookies to:',
        'privacy.sections.cookies.items.0': 'Remember your theme preference settings',
        'privacy.sections.cookies.items.1': 'Analyze website usage',
        'privacy.sections.cookies.items.2': 'Improve user experience',
        'privacy.sections.cookies.note': 'You can disable cookies through browser settings, but this may affect the use of certain features.',
        'privacy.sections.rights.title': '6. Your Rights',
        'privacy.sections.rights.description': 'Under applicable law, you have the right to:',
        'privacy.sections.rights.items.0': 'Access personal information we hold about you',
        'privacy.sections.rights.items.1': 'Request correction of inaccurate information',
        'privacy.sections.rights.items.2': 'Request deletion of your personal information',
        'privacy.sections.rights.items.3': 'Object to processing of your personal information',
        'privacy.sections.rights.items.4': 'Data portability',
        'privacy.sections.contact.title': '7. Contact Us',
        'privacy.sections.contact.description': 'If you have any questions about this privacy policy or need to exercise your rights, please contact us through:',
        'privacy.sections.contact.email': 'Email:',
        'privacy.sections.contact.address': 'Address:',
        'privacy.sections.contact.responseTime': 'Response Time:',
        'privacy.sections.contact.responseTimeValue': 'We will respond within 30 days of receiving your request',
        'privacy.sections.updates.title': '8. Policy Updates',
        'privacy.sections.updates.description': 'We may update this privacy policy from time to time. Major changes will be notified to you through website notifications or email. We recommend that you regularly review this policy to understand how we protect your information.'
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{getText('privacy.title')}</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {getText('privacy.lastUpdated')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.collection.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.collection.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>{getText('privacy.sections.collection.items.0')}</strong></li>
              <li><strong>{getText('privacy.sections.collection.items.1')}</strong></li>
              <li><strong>{getText('privacy.sections.collection.items.2')}</strong></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.usage.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.usage.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('privacy.sections.usage.items.0')}</li>
              <li>{getText('privacy.sections.usage.items.1')}</li>
              <li>{getText('privacy.sections.usage.items.2')}</li>
              <li>{getText('privacy.sections.usage.items.3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.protection.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.protection.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>{getText('privacy.sections.protection.items.0')}</strong></li>
              <li><strong>{getText('privacy.sections.protection.items.1')}</strong></li>
              <li><strong>{getText('privacy.sections.protection.items.2')}</strong></li>
              <li><strong>{getText('privacy.sections.protection.items.3')}</strong></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.sharing.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.sharing.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('privacy.sections.sharing.items.0')}</li>
              <li>{getText('privacy.sections.sharing.items.1')}</li>
              <li>{getText('privacy.sections.sharing.items.2')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.cookies.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.cookies.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('privacy.sections.cookies.items.0')}</li>
              <li>{getText('privacy.sections.cookies.items.1')}</li>
              <li>{getText('privacy.sections.cookies.items.2')}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {getText('privacy.sections.cookies.note')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.rights.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.rights.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('privacy.sections.rights.items.0')}</li>
              <li>{getText('privacy.sections.rights.items.1')}</li>
              <li>{getText('privacy.sections.rights.items.2')}</li>
              <li>{getText('privacy.sections.rights.items.3')}</li>
              <li>{getText('privacy.sections.rights.items.4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.contact.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('privacy.sections.contact.description')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>{getText('privacy.sections.contact.email')}</strong>privacy@imagecirclemaker.com<br/>
                <strong>{getText('privacy.sections.contact.address')}</strong>[Company Address]<br/>
                <strong>{getText('privacy.sections.contact.responseTime')}</strong>{getText('privacy.sections.contact.responseTimeValue')}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('privacy.sections.updates.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {getText('privacy.sections.updates.description')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 
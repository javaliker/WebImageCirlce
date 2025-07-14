'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TermsPage() {
  const { language, t, mounted } = useLanguage()

  // 在组件完全挂载前，使用默认的英文文本
  const getText = (key: string) => {
    if (!mounted) {
      const defaultTexts: Record<string, string> = {
        'terms.title': 'Terms of Service',
        'terms.description': 'ImageCircleMaker terms of service and usage conditions',
        'terms.lastUpdated': 'Last updated: December 2024',
        'terms.sections.description.title': '1. Service Description',
        'terms.sections.description.description': 'ImageCircleMaker is an online circular avatar creation tool that provides the following services:',
        'terms.sections.description.items.0': 'Image upload and local processing',
        'terms.sections.description.items.1': 'Circular cropping and editing features',
        'terms.sections.description.items.2': 'Multi-format export (PNG, JPG, WebP)',
        'terms.sections.description.items.3': 'Multi-platform size adaptation',
        'terms.sections.description.items.4': 'Theme switching functionality',
        'terms.sections.conditions.title': '2. Usage Conditions',
        'terms.sections.conditions.description': 'By using our services, you agree to:',
        'terms.sections.conditions.items.0': 'Comply with all applicable laws and regulations',
        'terms.sections.conditions.items.1': 'Not upload images containing malicious content, pornography, violence, or infringing on others\' rights',
        'terms.sections.conditions.items.2': 'Not abuse services or engage in any activities that may harm system performance',
        'terms.sections.conditions.items.3': 'Not attempt to crack, reverse engineer, or interfere with our services',
        'terms.sections.conditions.items.4': 'Be responsible for the content of images you upload, ensuring you have the right to use these images',
        'terms.sections.intellectual.title': '3. Intellectual Property',
        'terms.sections.intellectual.description': 'Regarding intellectual property provisions:',
        'terms.sections.intellectual.items.0': 'Your Images: You retain all rights to uploaded images, and we will not acquire ownership of your images',
        'terms.sections.intellectual.items.1': 'Our Services: ImageCircleMaker and related technologies, designs, trademarks, and other intellectual property are owned by us',
        'terms.sections.intellectual.items.2': 'Third-party Content: We respect third-party intellectual property rights. If you find infringing content, please contact us promptly',
        'terms.sections.availability.title': '4. Service Availability',
        'terms.sections.availability.description': 'We are committed to providing high-quality services, but please note:',
        'terms.sections.availability.items.0': 'Services may be temporarily unavailable due to maintenance, updates, or technical issues',
        'terms.sections.availability.items.1': 'We do not guarantee 100% uninterrupted or error-free service',
        'terms.sections.availability.items.2': 'We reserve the right to modify, suspend, or terminate services at any time',
        'terms.sections.availability.items.3': 'Major changes will be notified to users in advance',
        'terms.sections.disclaimer.title': '5. Disclaimer',
        'terms.sections.disclaimer.description': 'To the maximum extent permitted by law:',
        'terms.sections.disclaimer.items.0': 'We provide services "as is" without any express or implied warranties',
        'terms.sections.disclaimer.items.1': 'We do not guarantee that services will meet your specific needs or expectations',
        'terms.sections.disclaimer.items.2': 'We are not liable for any direct, indirect, incidental, or special damages arising from the use of services',
        'terms.sections.disclaimer.items.3': 'You bear the risk of using our services',
        'terms.sections.limitation.title': '6. Limitation of Liability',
        'terms.sections.limitation.description': 'Our liability limitations:',
        'terms.sections.limitation.items.0': 'In no event shall our total liability exceed the amount you paid for using the services',
        'terms.sections.limitation.items.1': 'For free services, our liability is limited to $100',
        'terms.sections.limitation.items.2': 'Laws in certain jurisdictions may not allow liability limitations. In such cases, our liability will be limited to the maximum extent permitted by law',
        'terms.sections.termination.title': '7. Termination',
        'terms.sections.termination.description': 'Conditions for service termination:',
        'terms.sections.termination.items.0': 'You violate any provision of these terms of service',
        'terms.sections.termination.items.1': 'We decide to discontinue providing services',
        'terms.sections.termination.items.2': 'Legal requirements mandate service termination',
        'terms.sections.termination.items.3': 'After termination, your right to use services will cease immediately',
        'terms.sections.disputes.title': '8. Dispute Resolution',
        'terms.sections.disputes.description': 'Methods for dispute resolution:',
        'terms.sections.disputes.items.0': 'We encourage resolving disputes through friendly negotiation',
        'terms.sections.disputes.items.1': 'If negotiation fails, disputes will be resolved through arbitration',
        'terms.sections.disputes.items.2': 'Arbitration location and procedures will be determined according to applicable law',
        'terms.sections.disputes.items.3': 'These terms are governed by [applicable law]',
        'terms.sections.modification.title': '9. Terms Modification',
        'terms.sections.modification.description': 'We reserve the right to modify these terms of service at any time:',
        'terms.sections.modification.items.0': 'Major modifications will be notified to users 30 days in advance',
        'terms.sections.modification.items.1': 'Continued use of services indicates your acceptance of modified terms',
        'terms.sections.modification.items.2': 'If you disagree with modifications, please stop using our services',
        'terms.sections.contact.title': '10. Contact Us',
        'terms.sections.contact.description': 'If you have any questions or suggestions about these terms of service, please contact us through:',
        'terms.sections.contact.items.0': 'Email: contact@imagecirclemaker.com',
        'terms.sections.contact.items.1': 'We will respond to your inquiries within a reasonable time'
      }
      return defaultTexts[key] || key
    }
    return t(key)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{getText('terms.title')}</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {getText('terms.lastUpdated')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.description.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.description.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.description.items.0')}</li>
              <li>{getText('terms.sections.description.items.1')}</li>
              <li>{getText('terms.sections.description.items.2')}</li>
              <li>{getText('terms.sections.description.items.3')}</li>
              <li>{getText('terms.sections.description.items.4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.conditions.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.conditions.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.conditions.items.0')}</li>
              <li>{getText('terms.sections.conditions.items.1')}</li>
              <li>{getText('terms.sections.conditions.items.2')}</li>
              <li>{getText('terms.sections.conditions.items.3')}</li>
              <li>{getText('terms.sections.conditions.items.4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.intellectual.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.intellectual.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>{getText('terms.sections.intellectual.items.0')}</strong></li>
              <li><strong>{getText('terms.sections.intellectual.items.1')}</strong></li>
              <li><strong>{getText('terms.sections.intellectual.items.2')}</strong></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.availability.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.availability.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.availability.items.0')}</li>
              <li>{getText('terms.sections.availability.items.1')}</li>
              <li>{getText('terms.sections.availability.items.2')}</li>
              <li>{getText('terms.sections.availability.items.3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.disclaimer.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.disclaimer.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.disclaimer.items.0')}</li>
              <li>{getText('terms.sections.disclaimer.items.1')}</li>
              <li>{getText('terms.sections.disclaimer.items.2')}</li>
              <li>{getText('terms.sections.disclaimer.items.3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.limitation.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.limitation.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.limitation.items.0')}</li>
              <li>{getText('terms.sections.limitation.items.1')}</li>
              <li>{getText('terms.sections.limitation.items.2')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.termination.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.termination.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.termination.items.0')}</li>
              <li>{getText('terms.sections.termination.items.1')}</li>
              <li>{getText('terms.sections.termination.items.2')}</li>
              <li>{getText('terms.sections.termination.items.3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.disputes.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.disputes.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.disputes.items.0')}</li>
              <li>{getText('terms.sections.disputes.items.1')}</li>
              <li>{getText('terms.sections.disputes.items.2')}</li>
              <li>{getText('terms.sections.disputes.items.3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.modification.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.modification.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.modification.items.0')}</li>
              <li>{getText('terms.sections.modification.items.1')}</li>
              <li>{getText('terms.sections.modification.items.2')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{getText('terms.sections.contact.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {getText('terms.sections.contact.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{getText('terms.sections.contact.items.0')}</li>
              <li>{getText('terms.sections.contact.items.1')}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
} 
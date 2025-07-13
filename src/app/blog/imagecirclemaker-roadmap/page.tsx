import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Rocket, Target, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ImageCircleMaker Roadmap - What\'s Coming Next | ImageCircleMaker',
  description: 'Get an exclusive look at our development roadmap and discover the exciting features we\'re planning to bring to ImageCircleMaker.',
  keywords: 'ImageCircleMaker roadmap, future features, development plans, circular avatar tools',
  openGraph: {
    title: 'ImageCircleMaker Roadmap - What\'s Coming Next',
    description: 'Get an exclusive look at our development roadmap and discover the exciting features we\'re planning to bring to ImageCircleMaker.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  }
}

export default function ImageCircleMakerRoadmap() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to Blog */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full">
              Roadmap
            </span>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              January 25, 2024
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              3 min read
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            ImageCircleMaker Roadmap - What's Coming Next
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover the exciting features and improvements we're planning to bring to ImageCircleMaker in the coming months.
          </p>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6">
          <h2 className="text-2xl font-bold mb-6 mt-12">Our Vision for the Future</h2>
          
          <p>
            Since launching ImageCircleMaker, we've been overwhelmed by the positive response from our community. Your feedback, suggestions, and feature requests have been invaluable in shaping our development roadmap. Today, we're excited to share our vision for the future and give you a glimpse of what's coming next.
          </p>

          <p>
            Our mission remains the same: to provide the best circular avatar creation tool while maintaining our core principles of privacy, simplicity, and accessibility. As we grow, we're committed to enhancing the user experience while staying true to these fundamental values.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12">Short-Term Goals (Q1-Q2 2024)</h2>
          
          <p>
            In the next few months, we're focusing on expanding our format support and improving the user experience. One of the most requested features has been support for additional image formats, and we're happy to announce that WebP and AVIF support will be available soon. These modern formats offer better compression and quality, making them ideal for web use.
          </p>

          <p>
            We're also working on a batch processing feature that will allow users to create multiple circular avatars at once. This will be particularly useful for businesses and content creators who need to process multiple images efficiently. The batch feature will maintain our privacy-first approach by processing all images locally.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12">Medium-Term Innovations (Q3-Q4 2024)</h2>
          
          <p>
            Looking ahead to the second half of 2024, we're planning some exciting AI-powered features. Our team is developing intelligent background removal technology that will automatically detect and remove backgrounds from images, making it easier to create clean, professional circular avatars. This feature will work entirely in the browser, maintaining our commitment to privacy.
          </p>

          <p>
            We're also working on a template library that will provide users with pre-designed circular frames, borders, and effects. These templates will be customizable and will help users create unique, branded avatars that stand out on social media platforms. The template system will be community-driven, allowing users to share and discover new designs.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12">Long-Term Vision (2025 and Beyond)</h2>
          
          <p>
            Our long-term vision extends beyond just circular avatars. We're exploring the possibility of expanding into other specialized image editing tools that follow the same principles of privacy, simplicity, and accessibility. This could include tools for creating social media banners, profile headers, and other specialized image formats.
          </p>

          <p>
            We're also considering the development of a mobile app that would provide the same powerful features in a native mobile environment. While our web-based tool works great on mobile browsers, a dedicated app could offer additional features like offline processing and deeper integration with mobile photo libraries.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12">Community-Driven Development</h2>
          
          <p>
            One of the most important aspects of our roadmap is that it's driven by our community. We regularly review user feedback, feature requests, and usage patterns to determine what to build next. Your input is crucial in helping us prioritize features and improvements that will have the greatest impact.
          </p>

          <p>
            We're also planning to launch a beta testing program that will allow interested users to try new features before they're officially released. This will help us gather feedback and ensure that new features meet the high standards our community expects.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12">Maintaining Our Core Values</h2>
          
          <p>
            As we add new features and capabilities, we remain committed to our core values. Privacy will always be our top priority - all new features will continue to process images locally without uploading to external servers. Simplicity will remain central to our design philosophy, ensuring that new features are intuitive and easy to use.
          </p>

          <p>
            We're also committed to keeping ImageCircleMaker free and accessible to everyone. While we may introduce premium features in the future, the core circular avatar creation functionality will always remain free. This commitment ensures that everyone has access to professional-quality tools regardless of their budget.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12">Stay Connected</h2>
          
          <p>
            We're excited about the future of ImageCircleMaker and can't wait to share these new features with you. To stay updated on our progress and be among the first to try new features, follow us on social media and subscribe to our newsletter. We'll be sharing regular updates, sneak peeks, and behind-the-scenes looks at our development process.
          </p>

          <p>
            Thank you for being part of our journey. Your support, feedback, and enthusiasm inspire us every day to make ImageCircleMaker better. Together, we're building the future of image editing tools.
          </p>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mt-8 border-l-4 border-purple-500">
            <p className="text-purple-800 dark:text-purple-200 font-medium mb-2">
              Be part of our journey
            </p>
            <p className="text-purple-700 dark:text-purple-300">
              Share your ideas and feedback with us. Your input helps shape the future of ImageCircleMaker and ensures we're building features that truly matter to our community.
            </p>
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
            <User className="w-4 h-4" />
            <span>Written by the ImageCircleMaker Team</span>
          </div>
        </footer>
      </div>
    </div>
  )
} 
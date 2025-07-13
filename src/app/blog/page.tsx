'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 'why-we-built-imagecirclemaker',
      title: 'Why We Built ImageCircleMaker - Solving a Real Problem',
      excerpt: 'Discover the personal story behind ImageCircleMaker and how we solved a common frustration with circular avatars for social media platforms.',
      date: '2024-01-15',
      readTime: '3 min read',
      category: 'Story'
    },
    {
      id: 'imagecirclemaker-features',
      title: 'ImageCircleMaker Features - What Makes Us Special',
      excerpt: 'Explore the powerful features that make ImageCircleMaker the go-to tool for creating perfect circular avatars for all your social media needs.',
      date: '2024-01-20',
      readTime: '4 min read',
      category: 'Features'
    },
    {
      id: 'imagecirclemaker-roadmap',
      title: 'ImageCircleMaker Roadmap - What\'s Coming Next',
      excerpt: 'Get an exclusive look at our development roadmap and discover the exciting features we\'re planning to bring to ImageCircleMaker.',
      date: '2024-01-25',
      readTime: '3 min read',
      category: 'Roadmap'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights, updates, and stories from the ImageCircleMaker team
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 
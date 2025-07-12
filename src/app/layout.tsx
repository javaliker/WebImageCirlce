import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'WebImageCircle - 免费在线圆形头像裁剪工具',
  description: '免费在线圆形头像裁剪工具，支持微信、微博、Instagram等社交平台。无需注册登录，即开即用，一键生成完美圆形头像。',
  keywords: '圆形头像,头像裁剪,圆形图片,社交媒体头像,微信头像,微博头像,Instagram头像',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 
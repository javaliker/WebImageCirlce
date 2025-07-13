import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '隐私政策 - ImageCircleMaker',
  description: '了解ImageCircleMaker如何保护您的隐私和数据安全',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">隐私政策</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            最后更新时间：2024年12月
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. 信息收集</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              ImageCircleMaker致力于保护您的隐私。我们收集的信息包括：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>使用数据：</strong>您使用我们服务的方式，包括功能使用情况和性能数据</li>
              <li><strong>技术信息：</strong>浏览器类型、操作系统、IP地址等</li>
              <li><strong>图片数据：</strong>您上传的图片仅在本地处理，不会上传到我们的服务器</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. 信息使用</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们使用收集的信息用于：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>提供和改进我们的服务</li>
              <li>分析使用模式以优化用户体验</li>
              <li>检测和防止欺诈或滥用行为</li>
              <li>遵守法律义务</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. 数据保护</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们采取以下措施保护您的数据：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>本地处理：</strong>您的图片在浏览器中本地处理，不会上传到服务器</li>
              <li><strong>加密传输：</strong>使用HTTPS加密所有数据传输</li>
              <li><strong>安全存储：</strong>服务器数据采用行业标准的安全措施保护</li>
              <li><strong>访问控制：</strong>严格限制对个人数据的访问权限</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. 信息共享</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们不会出售、交易或转让您的个人信息，除非：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>获得您的明确同意</li>
              <li>法律要求或政府机构要求</li>
              <li>保护我们的权利、财产或安全</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Cookie使用</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们使用Cookie来：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>记住您的主题偏好设置</li>
              <li>分析网站使用情况</li>
              <li>改善用户体验</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              您可以通过浏览器设置禁用Cookie，但这可能影响某些功能的使用。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. 您的权利</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              根据适用法律，您有权：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>访问我们持有的关于您的个人信息</li>
              <li>要求更正不准确的信息</li>
              <li>要求删除您的个人信息</li>
              <li>反对处理您的个人信息</li>
              <li>数据可携带性</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. 联系我们</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>邮箱：</strong>privacy@imagecirclemaker.com<br/>
                <strong>地址：</strong>[公司地址]<br/>
                <strong>响应时间：</strong>我们将在收到请求后30天内回复
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. 政策更新</h2>
            <p className="text-gray-700 dark:text-gray-300">
              我们可能会不时更新本隐私政策。重大变更将通过网站通知或电子邮件通知您。
              建议您定期查看本政策以了解我们如何保护您的信息。
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 
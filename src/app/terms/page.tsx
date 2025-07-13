import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '服务条款 - ImageCircleMaker',
  description: 'ImageCircleMaker的服务条款和使用条件',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">服务条款</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            最后更新时间：2024年12月
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. 服务描述</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              ImageCircleMaker是一个在线圆形头像制作工具，提供以下服务：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>图片上传和本地处理</li>
              <li>圆形裁剪和编辑功能</li>
              <li>多格式导出（PNG、JPG、WebP）</li>
              <li>多平台尺寸适配</li>
              <li>主题切换功能</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. 使用条件</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              使用我们的服务，您同意：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>遵守所有适用的法律法规</li>
              <li>不上传包含恶意内容、色情、暴力或侵犯他人权利的图片</li>
              <li>不滥用服务或进行任何可能损害系统性能的活动</li>
              <li>不尝试破解、逆向工程或干扰我们的服务</li>
              <li>对您上传的图片内容负责，确保您有权使用这些图片</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. 知识产权</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              关于知识产权的规定：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>您的图片：</strong>您保留对上传图片的所有权利，我们不会获取您图片的所有权</li>
              <li><strong>我们的服务：</strong>ImageCircleMaker及其相关技术、设计、商标等知识产权归我们所有</li>
              <li><strong>第三方内容：</strong>我们尊重第三方知识产权，如发现侵权内容请及时联系我们</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. 服务可用性</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们致力于提供高质量的服务，但请注意：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>服务可能因维护、更新或技术问题而暂时不可用</li>
              <li>我们不保证服务100%无中断或错误</li>
              <li>我们保留随时修改、暂停或终止服务的权利</li>
              <li>重大变更将提前通知用户</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. 免责声明</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              在法律允许的最大范围内：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>我们按"现状"提供服务，不提供任何明示或暗示的保证</li>
              <li>我们不保证服务满足您的特定需求或期望</li>
              <li>我们不承担因使用服务而产生的任何直接、间接、偶然或特殊损失</li>
              <li>您使用服务的风险由您自行承担</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. 责任限制</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们的责任限制：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>在任何情况下，我们的总责任不超过您为使用服务支付的金额</li>
              <li>对于免费服务，我们的责任限制为100美元</li>
              <li>某些司法管辖区的法律可能不允许责任限制，在这种情况下，我们的责任将限于法律允许的最大范围</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. 终止</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              服务终止的条件：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>您违反本服务条款的任何规定</li>
              <li>我们决定停止提供服务</li>
              <li>法律要求终止服务</li>
              <li>终止后，您使用服务的权利将立即停止</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. 争议解决</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              争议解决方式：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>我们鼓励通过友好协商解决争议</li>
              <li>如协商不成，争议将通过仲裁解决</li>
              <li>仲裁地点和程序将根据适用法律确定</li>
              <li>本条款受[适用法律]管辖</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. 条款修改</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              我们保留随时修改本服务条款的权利：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>重大修改将提前30天通知用户</li>
              <li>继续使用服务即表示您接受修改后的条款</li>
              <li>如不同意修改，请停止使用我们的服务</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. 联系我们</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              如果您对本服务条款有任何疑问或建议，请通过以下方式联系我们：
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>邮箱：contact@imagecirclemaker.com</li>
              <li>我们将在合理时间内回复您的咨询</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
} 
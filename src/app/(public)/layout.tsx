import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/site-settings'
import { resolveImageSrc } from '@/lib/image-url'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const logoSrc = settings.logoUrl ? resolveImageSrc(settings.logoUrl) : '/logo.jpg'

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header logoSrc={logoSrc} organizationName={settings.organizationName} />
      <main id="main-content" className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}

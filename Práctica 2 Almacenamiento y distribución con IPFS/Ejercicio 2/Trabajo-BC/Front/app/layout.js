import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Poppins } from 'next/font/google'
import './globals.css'
import ComprobarMetamask from '@/components/ComprobarMetamask'
import Script from 'next/script'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'EtherLease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <Script src="https://cdn.jsdelivr.net/npm/kubo-rpc-client/dist/index.min.js"></Script>
      <body className='h-screen flex flex-col'>
        <ComprobarMetamask>
          <Header />
          {children}
          <Footer />
        </ComprobarMetamask>
      </body>
    </html>
  )
}

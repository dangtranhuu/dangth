import localFont from 'next/font/local'

export const cmuSans = localFont({
  src: [
    {
      path: '../public/fonts/cmu/sans/cmunss.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/cmu/sans/cmunsx.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/cmu/sans/cmunsi.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/cmu/sans/cmunso.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-cmusans',
  display: 'swap',
})

export const iBMPlexSans = localFont({
  src: [
    {
      path: '../public/fonts/IBM-PlexSans/IBMPlexSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-iBMPlexSans',
  display: 'swap',
})


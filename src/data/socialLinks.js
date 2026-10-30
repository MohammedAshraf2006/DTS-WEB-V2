export const socialLinks = [
  { key: 'whatsapp', href: 'https://wa.me/201050992816', labelKey: 'common.social.whatsapp' },
  { key: 'facebook', href: 'https://www.facebook.com/DTS.EGYPT22', labelKey: 'common.social.facebook' },
  { key: 'linkedin', href: 'https://www.linkedin.com/company/dtsegypt22', labelKey: 'common.social.linkedin' },
  { key: 'instagram', href: 'https://www.instagram.com/dts.egypt/', labelKey: 'common.social.instagram' }
]

export const socialSameAs = socialLinks
  .filter((item) => item.key !== 'whatsapp')
  .map((item) => item.href)

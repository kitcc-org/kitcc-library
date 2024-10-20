import { AspectRatio, Image, rem } from '@mantine/core'
import Logo from 'public/kitcc.png'

const HeaderTitleLogo = () => {
  return (
    <AspectRatio
      ratio={300 / 90}
      style={{ flex: `0 0 ${rem(150)}` }}
    >
      <Image
        src={Logo}
        alt='kitcc-logo'
      />
    </AspectRatio>
  )
}

export default HeaderTitleLogo
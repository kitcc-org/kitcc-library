import { AspectRatio, Image, rem } from '@mantine/core';
import Logo from '~/img/kitcc.png';

const HeaderTitleLogo = () => {
	return (
		<AspectRatio ratio={300 / 90} style={{ flex: `0 0 ${rem(150)}` }}>
			<a href="/home">
				<Image src={Logo} alt="kitcc-logo" />
			</a>
		</AspectRatio>
	);
};

export default HeaderTitleLogo;

import PasswordGenerateButton from './PasswordGenerateButton';
import PasswordValidCountComponent from './PasswordValidCountComponent';

interface UserAddPasswordComponentProps {
	handlePasswordGenButtonClick: () => void;
	copied: boolean;
	counts: number;
}

const UserAddPasswordComponent = ({
	handlePasswordGenButtonClick,
	copied,
	counts,
}: UserAddPasswordComponentProps) => {
	if (copied) {
		return <PasswordValidCountComponent counts={counts} />;
	} else {
		return (
			<PasswordGenerateButton
				handlePasswordGenButtonClick={handlePasswordGenButtonClick}
			/>
		);
	}
};

export default UserAddPasswordComponent;

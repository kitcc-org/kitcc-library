import PasswordGenerateButton from './PasswordGenerateButton';
import PasswordValidCountComponent from './PasswordValidCountComponent';

interface UserCreatePasswordComponentProps {
	handlePasswordGenButtonClick: () => void;
	copied: boolean;
	counts: number;
}

const UserCreatePasswordComponent = ({
	handlePasswordGenButtonClick,
	copied,
	counts,
}: UserCreatePasswordComponentProps) => {
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

export default UserCreatePasswordComponent;

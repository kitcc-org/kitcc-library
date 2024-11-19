import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CreateUserBody } from 'client/client.schemas';
import { IoCheckmark, IoCopyOutline } from 'react-icons/io5';
import { successNotification } from '~/utils/notification';

interface PasswordCopyButtonProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
	generated: boolean; // パスワードがすでに生成されているかどうか
}

const PasswordCopyButton = ({ form, generated }: PasswordCopyButtonProps) => {
	return (
		<CopyButton value={form.getValues().password} timeout={2000}>
			{({ copied, copy }) => (
				<Tooltip
					label={
						copied ? 'パスワードをコピーしました' : 'パスワードをコピーする'
					}
					withArrow
					position="right"
				>
					<ActionIcon
						color={copied ? 'teal' : 'black'}
						variant="subtle"
						disabled={!generated}
						onClick={() => {
							successNotification('パスワードをコピーしました');
							copy();
						}}
					>
						{copied ? <IoCheckmark /> : <IoCopyOutline />}
					</ActionIcon>
				</Tooltip>
			)}
		</CopyButton>
	);
};

export default PasswordCopyButton;

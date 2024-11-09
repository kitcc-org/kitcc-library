import { Alert, Center } from '@mantine/core';
import React from 'react';

const NoQueryComponent = () => {
	return (
		<Center w="100%" h="70dh">
			<Alert variant="light" color="teal" title="検索条件を指定してください" />
		</Center>
	);
};

export default NoQueryComponent;

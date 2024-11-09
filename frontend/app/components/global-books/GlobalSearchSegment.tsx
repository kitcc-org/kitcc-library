import { SegmentedControl } from '@mantine/core';
import React from 'react';

interface GlobalSearchSegmentProps {
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalSearchSegment = ({
	searchMode,
	setSearchMode,
}: GlobalSearchSegmentProps) => {
	return (
		<SegmentedControl
			value={searchMode}
			onChange={setSearchMode}
			data={[
				{ label: '詳細検索', value: 'detail' },
				{ label: 'キーワード検索', value: 'keyword' },
			]}
		/>
	);
};

export default GlobalSearchSegment;

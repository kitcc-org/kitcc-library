import { Anchor, Breadcrumbs, Group, Text } from '@mantine/core';
import React from 'react';

interface AnchorProps {
	icon: React.ReactNode;
	title: string;
	href: string;
}

interface BreadCrumbsComponentProps {
	anchors: AnchorProps[];
}

const BreadCrumbsComponent = ({ anchors }: BreadCrumbsComponentProps) => {
	return (
		<Breadcrumbs my="xs">
			{anchors.map((item, index) => (
				<Anchor href={item.href} key={index}>
					<Group gap="xs">
						{item.icon}
						<Text span truncate="end">
							{item.title}
						</Text>
					</Group>
				</Anchor>
			))}
		</Breadcrumbs>
	);
};

export default BreadCrumbsComponent;

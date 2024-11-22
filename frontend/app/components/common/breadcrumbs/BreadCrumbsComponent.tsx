import { Anchor, Breadcrumbs } from '@mantine/core';
import React from 'react';

interface AnchorProps {
	title: string;
	href: string;
}

interface BreadCrumbsComponentProps {
	anchors: AnchorProps[];
}

const BreadCrumbsComponent = ({ anchors }: BreadCrumbsComponentProps) => {
	return (
		<Breadcrumbs>
			{anchors.map((item, index) => (
				<Anchor href={item.href} key={index}>
					{item.title}
				</Anchor>
			))}
		</Breadcrumbs>
	);
};

export default BreadCrumbsComponent;

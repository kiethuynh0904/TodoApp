import React from 'react';
import { Text as GlueStackText } from '@gluestack-ui/themed';
import { FunctionComponent } from '@/types/guards/common';

export interface TextProps
	extends React.ComponentPropsWithRef<typeof GlueStackText> {
	children?: React.ReactNode;
}

export function Text({
	children = null,
	...props
}: TextProps): FunctionComponent {
	return <GlueStackText {...props}>{children}</GlueStackText>;
}

export default Text;

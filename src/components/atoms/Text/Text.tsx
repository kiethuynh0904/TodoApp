import React from 'react';
import { Text as GlueStackText } from '@gluestack-ui/themed';
import { FunctionComponent } from '@/types/guards/common';
import { useTheme } from '@/theme';

export interface TextProps
	extends React.ComponentPropsWithRef<typeof GlueStackText> {
	children?: React.ReactNode;
}

export function Text({
	children = null,
	...props
}: TextProps): FunctionComponent {
	const { fonts } = useTheme();
	return (
		<GlueStackText style={[fonts.gray800, props.style]} {...props}>
			{children}
		</GlueStackText>
	);
}

export default Text;

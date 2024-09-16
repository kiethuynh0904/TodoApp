import { ViewStyle } from 'react-native';

export default {
	col: {
		flexDirection: 'column',
	},
	colReverse: {
		flexDirection: 'column-reverse',
	},
	wrap: {
		flexWrap: 'wrap',
	},
	row: {
		flexDirection: 'row',
	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	itemsCenter: {
		alignItems: 'center',
	},
	itemsStart: {
		alignItems: 'flex-start',
	},
	itemsStretch: {
		alignItems: 'stretch',
	},
	itemsEnd: {
		alignItems: 'flex-end',
	},
	justifyCenter: {
		justifyContent: 'center',
	},
	justifyAround: {
		justifyContent: 'space-around',
	},
	justifyBetween: {
		justifyContent: 'space-between',
	},
	justifyEnd: {
		justifyContent: 'flex-end',
	},
	justifyStart: {
		justifyContent: 'flex-start',
	},
	/* Sizes Layouts */
	flex_1: {
		flex: 1,
	},
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},
	/* Positions */
	relative: {
		position: 'relative',
	},
	absolute: {
		position: 'absolute',
	},
	top0: {
		top: 0,
	},
	bottom0: {
		bottom: 0,
	},
	left0: {
		left: 0,
	},
	right0: {
		right: 0,
	},
	z1: {
		zIndex: 1,
	},
	z10: {
		zIndex: 10,
	},
	shadow0: {
		elevation: 2,
		shadowColor: 'rgba(0, 0, 0, 0.25)',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
	shadow1: {
		elevation: 2,
		shadowColor: 'rgba(0, 0, 0, 0.04)',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 1,
		shadowRadius: 10,
	},
} as const satisfies Record<string, ViewStyle>;

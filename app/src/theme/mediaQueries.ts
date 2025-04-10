/**
 * Use like:
 *
 * const Element = styled.div`
 *   ${({ theme }) => `
 * 		display: flex;
 *
 * 		${theme.mediaQueries.mobile} {
 * 			display: block;
 * 		}
 *   `}
 * `
 */

export const mobile = '@media screen and (max-width: 580px)';
export const tablet = '@media screen and (min-width: 960px)';
export const desktop = '@media screen and (min-width: 1200px)';

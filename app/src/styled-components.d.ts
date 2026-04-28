import 'styled-components';
import type { CustomTheme } from './theme/defaultTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}

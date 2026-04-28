import React, { FC } from 'react';

import Glyph01 from '../../svg/glyphs/01.svg';
import Glyph02 from '../../svg/glyphs/02.svg';
import Glyph03 from '../../svg/glyphs/03.svg';
import Glyph04 from '../../svg/glyphs/04.svg';
import Glyph05 from '../../svg/glyphs/05.svg';
import Glyph06 from '../../svg/glyphs/06.svg';
import Glyph07 from '../../svg/glyphs/07.svg';
import Glyph08 from '../../svg/glyphs/08.svg';
import Glyph09 from '../../svg/glyphs/09.svg';
import Glyph10 from '../../svg/glyphs/10.svg';
import Glyph11 from '../../svg/glyphs/11.svg';
import Glyph12 from '../../svg/glyphs/12.svg';
import Glyph13 from '../../svg/glyphs/13.svg';
import Glyph14 from '../../svg/glyphs/14.svg';

type ProjectLinkGlyphProps = {
  index: number;
};

export const ProjectLinkGlyph: FC<ProjectLinkGlyphProps> = ({ index }) => {
  const number = (index % 14) + 1;
  switch (number) {
    case 1:
      return <Glyph01 />;
    case 2:
      return <Glyph02 />;
    case 3:
      return <Glyph03 />;
    case 4:
      return <Glyph04 />;
    case 5:
      return <Glyph05 />;
    case 6:
      return <Glyph06 />;
    case 7:
      return <Glyph07 />;
    case 8:
      return <Glyph08 />;
    case 9:
      return <Glyph09 />;
    case 10:
      return <Glyph10 />;
    case 11:
      return <Glyph11 />;
    case 12:
      return <Glyph12 />;
    case 13:
      return <Glyph13 />;
    case 14:
      return <Glyph14 />;
    default:
      return null;
  }
};

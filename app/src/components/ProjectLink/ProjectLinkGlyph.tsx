import React, { FC } from 'react';
import One from '../../svg/glyphs/01.svg';
import Two from '../../svg/glyphs/02.svg';
import Three from '../../svg/glyphs/03.svg';
import Four from '../../svg/glyphs/04.svg';
import Five from '../../svg/glyphs/05.svg';
import Six from '../../svg/glyphs/06.svg';
import Seven from '../../svg/glyphs/07.svg';
import Eight from '../../svg/glyphs/08.svg';
import Nine from '../../svg/glyphs/09.svg';
import Ten from '../../svg/glyphs/10.svg';

type ProjectLinkGlyphProps = {
  index: number;
};

export const ProjectLinkGlyph: FC<ProjectLinkGlyphProps> = ({ index }) => {
  const number = (index % 10) + 1;
  switch (number) {
    case 1:
      return <One />;
    case 2:
      return <Two />;
    case 3:
      return <Three />;
    case 4:
      return <Four />;
    case 5:
      return <Five />;
    case 6:
      return <Six />;
    case 7:
      return <Seven />;
    case 8:
      return <Eight />;
    case 9:
      return <Nine />;
    case 10:
      return <Ten />;
    default:
      return null;
  }
};

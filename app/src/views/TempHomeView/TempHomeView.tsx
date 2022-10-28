import * as React from 'react';
import { Main, BackgroundVideo, ContentContainer } from './styles';

export const TempHomeView = () => {
  return (
    <Main>
      <BackgroundVideo src="/temp-home-video.mp4" autoPlay loop muted />
      <ContentContainer>
        <p>
          <strong>Mev Luna</strong>
          <br />
          <em>Materializing Citations</em>
        </p>

        <p>
          Mev Luna is a research-based artist living and working in Brooklyn,
          New York. Luna's practice spans performance, installation, video, new
          media, and text. Their work considers issues of incarceration,
          institutional access, and how images are circulated and controlled.
          Recent exhibitions include a solo show LaNao Galería in Mexico City
          and the group exhibition Empathy Fatigue at Andrew Rafacz Gallery,
          Chicago. Luna’s time-based works have premiered at SFMOMA, Artists'
          Television Access, San Francisco, The Gene Siskel Film Center,
          Chicago, and Kino Moviemento in Berlin, Germany. They've given talks
          at the Bauhaus-Universität Weimar, Northwestern University, Vanderbilt
          University, Bard College, and The School of the Art Institute of
          Chicago, among others. Luna was a 2018 Art Matters Foundation
          Fellowship recipient, a 2018-2019 BOLT resident at the Chicago Artist
          Coalition, a 2017 SOMA Summer participant in Mexico City, and a
          2015–2016 Research Fellow at the Shapiro Center for Research and
          Collaboration. They are currently Assistant Professor of Contemporary
          Art Practice and Theory at Parsons School of Design, The New School.
        </p>

        <p>
          contact: <a href="mailto:mev.luna@gmail.com">mev.luna@gmail.com</a>
        </p>
      </ContentContainer>
    </Main>
  );
};

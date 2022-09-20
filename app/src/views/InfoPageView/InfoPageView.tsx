import * as React from 'react';
import { InfoPage } from '../../types';
import { Accordion } from '../../components/Accordion';
import { RichText } from '../../components/RichText';
import { BodyHeading, Ul, Li } from '../../components/Text';
import { Divider } from '../../components/Layout';
import { definitely } from '../../utils';
import { InfoBodyWrapper, CVWrapper } from './styles';
import { CVGroup } from './CVGroup';

interface InfoPageViewProps {
  infoPage: InfoPage;
}

export const InfoPageView: React.FC<InfoPageViewProps> = ({ infoPage }) => {
  const { body, colophon, contactFields, cv, seo } = infoPage;

  return (
    <>
      <InfoBodyWrapper>
        <RichText text={body} />
        <div>
          {contactFields && contactFields.length ? (
            <>
              <BodyHeading>(Contact)</BodyHeading>
              <Ul>
                {contactFields.map(({ label, url }) => (
                  <Li strong key={url}>
                    <a href={url}>{label}</a>
                  </Li>
                ))}
              </Ul>
            </>
          ) : null}
          {colophon ? (
            <Accordion label={colophon.label}>
              <RichText text={colophon.contents} />
            </Accordion>
          ) : null}
        </div>
      </InfoBodyWrapper>
      <Divider />
      {cv && cv.length ? (
        <CVWrapper>
          {definitely(cv).map((group) => (
            <CVGroup key={group._key} group={group} />
          ))}
        </CVWrapper>
      ) : null}
    </>
  );
};

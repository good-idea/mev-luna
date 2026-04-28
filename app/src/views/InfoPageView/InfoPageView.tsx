import * as React from 'react';
import { InfoPage } from '../../types';
import { Accordion } from '../../components/Accordion';
import { RichText } from '../../components/RichText';
import { BodyHeading, Ul, Li } from '../../components/Text';
import { Divider } from '../../components/Layout';
import { filterMaybes } from '../../utils';
import { InfoBodyWrapper, CVWrapper } from './styles';
import { CVGroup } from './CVGroup';
import { NewsletterSignup } from 'src/components/NewsletterSignup';

interface InfoPageViewProps {
  infoPage: InfoPage;
}

export const InfoPageView: React.FC<InfoPageViewProps> = ({ infoPage }) => {
  const { body, colophon, contactFields, cv } = infoPage;

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
                  <Li $strong key={url}>
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
      <Divider my={6} />
      <NewsletterSignup />
      <Divider my={6} />
      {cv && cv.length ? (
        <CVWrapper>
          {filterMaybes(cv).map((group) => (
            <CVGroup key={group._key} group={group} />
          ))}
        </CVWrapper>
      ) : null}
    </>
  );
};

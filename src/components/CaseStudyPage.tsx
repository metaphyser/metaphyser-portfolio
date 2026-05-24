import { getNextCaseStudyCard } from '../content/caseStudies';
import { useMemo, useState } from 'react';
import type { CaseStudy } from '../content/caseStudies/types';
import { ExecutiveBuyInSection } from './ExecutiveBuyInSection';
import './CaseStudyPage.css';
import { HeroFeature } from './HeroFeature';
import { HeroIntro } from './HeroIntro';
import { HeroReveal } from './HeroReveal';
import { ImpactStrip } from './ImpactStrip';
import { KeyDecisionsSection } from './KeyDecisionsSection';
import { MediaCarousel } from './MediaCarousel';
import { MediaLightbox } from './MediaLightbox';
import { NextCaseStudySection } from './NextCaseStudySection';
import { OverviewSection } from './OverviewSection';
import { OutcomeSection } from './OutcomeSection';
import { ProblemSection } from './ProblemSection';
import { RoleSection } from './RoleSection';
import { uniqueMediaItems, type CaseStudyMediaItem } from './mediaUtils';

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const nextCaseStudy = getNextCaseStudyCard(caseStudy.slug);
  const mediaItems = useMemo(() => {
    const items: CaseStudyMediaItem[] = [];

    if (caseStudy.hero.videoSrc) {
      items.push({
        src: caseStudy.hero.videoSrc,
        label: caseStudy.hero.title,
        displaySize: caseStudy.hero.videoSrcDesktop ? 'half' : 'full',
      });
    }

    if (caseStudy.hero.videoSrcDesktop) {
      items.push({ src: caseStudy.hero.videoSrcDesktop, label: `${caseStudy.hero.title} desktop`, displaySize: 'full' });
    }

    if (caseStudy.hero.reveal) {
      items.push(
        { src: caseStudy.hero.reveal.beforeSrc, label: caseStudy.hero.reveal.beforeLabel, displaySize: 'full' },
        { src: caseStudy.hero.reveal.afterSrc, label: caseStudy.hero.reveal.afterLabel, displaySize: 'full' },
      );
    }

    if (caseStudy.media) {
      items.push(...caseStudy.media.items);
    }

    return uniqueMediaItems(items);
  }, [caseStudy]);

  const openMedia = (media: string | CaseStudyMediaItem) => {
    const src = typeof media === 'string' ? media : media.src;
    const displaySize = typeof media === 'string' ? undefined : media.displaySize;
    const nextIndex = mediaItems.findIndex(
      (item) => item.src === src && (displaySize ? (item.displaySize ?? 'full') === displaySize : true),
    );

    if (nextIndex >= 0) {
      setActiveMediaIndex(nextIndex);
    }
  };

  return (
    <>
      <HeroIntro
        brand={caseStudy.hero.brand}
        title={caseStudy.hero.title}
        subtitle={caseStudy.hero.subtitle}
        meta={caseStudy.hero.meta}
      />
      {caseStudy.hero.reveal ? (
        <HeroReveal
          beforeSrc={caseStudy.hero.reveal.beforeSrc}
          beforeSrcMobile={caseStudy.hero.reveal.beforeSrcMobile}
          beforeLabel={caseStudy.hero.reveal.beforeLabel}
          afterSrc={caseStudy.hero.reveal.afterSrc}
          afterSrcMobile={caseStudy.hero.reveal.afterSrcMobile}
          afterLabel={caseStudy.hero.reveal.afterLabel}
        />
      ) : caseStudy.hero.videoSrc ? (
        <HeroFeature
          src={caseStudy.hero.videoSrc}
          srcDesktop={caseStudy.hero.videoSrcDesktop}
          label={`Open ${caseStudy.hero.title}`}
          onOpen={openMedia}
        />
      ) : null}
      {caseStudy.impact ? (
        <div className="show-mobile-only case-study-impact-mobile">
          <ImpactStrip items={caseStudy.impact.items} />
        </div>
      ) : null}
      <OverviewSection
        title={caseStudy.overview.title}
        paragraphs={caseStudy.overview.paragraphs}
        leadingContent={
          caseStudy.impact ? (
            <div className="show-tablet-up">
              <ImpactStrip items={caseStudy.impact.items} />
            </div>
          ) : null
        }
      />

      <div className="page-shell">
        <article className="document">
          <RoleSection
            title={caseStudy.role.title}
            subtitle={caseStudy.role.subtitle}
            tag={caseStudy.role.tag}
            points={caseStudy.role.points}
          />
          <ProblemSection
            title={caseStudy.problem.title}
            beginning={caseStudy.problem.beginning}
            middle={caseStudy.problem.middle}
            end={caseStudy.problem.end}
          />
          {caseStudy.executiveBuyIn ? (
            <ExecutiveBuyInSection
              title={caseStudy.executiveBuyIn.title}
              intro={caseStudy.executiveBuyIn.intro}
              validationItems={caseStudy.executiveBuyIn.validationItems}
              result={caseStudy.executiveBuyIn.result}
              proofItems={caseStudy.executiveBuyIn.proofItems}
            />
          ) : null}
          {caseStudy.media ? (
            <MediaCarousel breakout items={caseStudy.media.items} onItemOpen={openMedia} />
          ) : null}
          <KeyDecisionsSection
            title={caseStudy.keyDecisions.title}
            decisions={caseStudy.keyDecisions.decisions}
          />
          <OutcomeSection
            title={caseStudy.outcome.title}
            metrics={caseStudy.outcome.metrics}
            changes={caseStudy.outcome.changes}
            groups={caseStudy.outcome.groups}
          />
          {nextCaseStudy ? <NextCaseStudySection caseStudy={nextCaseStudy} /> : null}
        </article>
      </div>

      {activeMediaIndex !== null ? (
        <MediaLightbox
          items={mediaItems}
          activeIndex={activeMediaIndex}
          onClose={() => setActiveMediaIndex(null)}
          onNavigate={setActiveMediaIndex}
        />
      ) : null}
    </>
  );
}

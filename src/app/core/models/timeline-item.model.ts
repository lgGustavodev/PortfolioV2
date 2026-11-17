export type TimelineKind = 'trabalho' | 'estudo';

export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  description: string;
  kind: TimelineKind;
}

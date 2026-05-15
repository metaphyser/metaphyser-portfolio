import type { ReactNode } from 'react';
import './SectionFlow.css';

type SectionFlowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionFlow({ children, className }: SectionFlowProps) {
  return <div className={['section-flow', className].filter(Boolean).join(' ')}>{children}</div>;
}

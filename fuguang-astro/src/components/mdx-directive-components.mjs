import CalloutAccent from './The Top Accent.astro';
import CalloutGlow from './The Glowing Edge.astro';
import CalloutBadge from './The Badge Floating.astro';
import CalloutWire from './Minimal Wireframe.astro';
import CalloutGlass from './Frosted Glass.astro';
import CalloutNeon from './Neon Warning Grid.astro';
import KeywordChip from './KeywordChip.astro';

export const mdxComponents = {
  'directive-accent': CalloutAccent,
  'directive-glow': CalloutGlow,
  'directive-badge': CalloutBadge,
  'directive-wire': CalloutWire,
  'directive-glass': CalloutGlass,
  'directive-neon': CalloutNeon,
  'directive-kw': KeywordChip
};

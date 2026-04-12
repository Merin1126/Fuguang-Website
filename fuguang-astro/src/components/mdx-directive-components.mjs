import CalloutAccent from './The Top Accent.astro';
import CalloutGlow from './The Glowing Edge.astro';
import CalloutBadge from './The Badge Floating.astro';
import CalloutWire from './Minimal Wireframe.astro';
import CalloutGlass from './Frosted Glass.astro';
import CalloutNeon from './Neon Warning Grid.astro';
import KeywordChip from './KeywordChip.astro';
import Ruby from './Ruby.astro';
import ReferenceCitation from './ReferenceCitation.astro';
import DashedDivider from './DashedDivider.astro';

export const mdxComponents = {
  'directive-accent': CalloutAccent,
  'directive-glow': CalloutGlow,
  'directive-badge': CalloutBadge,
  'directive-wire': CalloutWire,
  'directive-glass': CalloutGlass,
  'directive-neon': CalloutNeon,
  'directive-kw': KeywordChip,
  'directive-ref': ReferenceCitation,
  'directive-dash': DashedDivider,
  // :::ruby / :::rb（leaf 或 container，属性如 t= 假名）
  'directive-ruby': Ruby,
  'directive-rb': Ruby
};

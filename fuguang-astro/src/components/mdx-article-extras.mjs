import ProfileCard from './ProfileCard.astro';
import Signature from './Signature.astro';
import SideImage from './SideImage.astro';

/** 仅 blog 在 central 表之上合并的指令 */
export const mdxArticleExtras = {
  'directive-profile': ProfileCard,
  'directive-sideimg': SideImage,
  // remark 将 :::sig / ::sig 映射为 directive-sig（不是 directive-signature）
  'directive-sig': Signature,
  'directive-signature': Signature
};

import { visit } from 'unist-util-visit';

export default function remarkDirectiveMapping() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {});
        // 将 :::glass 转换为虚拟的 <directive-glass> 标签
        data.hName = `directive-${node.name}`;
        data.hProperties = node.attributes || {};
      }
    });
  };
}

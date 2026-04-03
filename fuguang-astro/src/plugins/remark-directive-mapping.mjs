import { visit } from 'unist-util-visit';

export default function remarkDirectiveMapping() {
  return (tree) => {
    visit(tree, (node) => {
      //  Text Directive (:ref)
      if (node.type === 'textDirective') {
        const data = node.data || (node.data = {});
        
        // 2. 将 :ref指令 转换为虚拟的 <directive-ref> 标签
        data.hName = `directive-${node.name}`;
        data.hProperties = node.attributes || {};
      }
       // containerDirective (:::accent) 的处理代码
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

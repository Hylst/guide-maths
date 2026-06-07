import React, { ReactNode, ReactElement } from 'react';

export function extractTextFromNode(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('');
  }
  if (React.isValidElement(node)) {
    const element = node as ReactElement<{children?: ReactNode}>;
    return extractTextFromNode(element.props.children);
  }
  return '';
}

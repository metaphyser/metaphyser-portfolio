import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

const NON_BREAKING_HYPHEN = '\u2011';
const HYPHENATED_WORD_PATTERN = /([\p{L}\p{N}])-(?=[\p{L}\p{N}])/gu;

function normalizeTextValue(value: string) {
  return value.replace(HYPHENATED_WORD_PATTERN, `$1${NON_BREAKING_HYPHEN}`);
}

export function normalizeHyphenatedWords(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    return normalizeTextValue(node);
  }

  if (typeof node === 'number' || typeof node === 'boolean' || node == null) {
    return node;
  }

  if (Array.isArray(node)) {
    return Children.map(node, (child) => normalizeHyphenatedWords(child));
  }

  if (isValidElement(node)) {
    const elementChildren = (node.props as { children?: ReactNode }).children;
    const childCount = Children.count(elementChildren);

    if (childCount === 0) {
      return node;
    }

    const normalizedChildren = Children.map(elementChildren, (child) => normalizeHyphenatedWords(child));
    return cloneElement(node, undefined, normalizedChildren);
  }

  return node;
}

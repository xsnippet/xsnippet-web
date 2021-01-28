declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<
    SVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

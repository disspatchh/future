declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';

declare module 'remoteDashboard/App';

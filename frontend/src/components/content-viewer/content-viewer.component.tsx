import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { BORDER_RADIUS } from '../../constants/margins';

const Box = styled.div`
  width: 800px;
  padding: 30px;
  box-sizing: border-box;

  border: 1px solid #5d6777;
  border-radius: ${BORDER_RADIUS};
  background: rgb(80 94 118 / 60%);

  font-size: 16px;
  color: #c6d5e5;

  p {
    margin: 10px;
  }
`;

interface IContentViewerProps {
  content?: string;
}

export const ContentViewer = ({ content }: IContentViewerProps) => {
  if (!content) return null;

  const clean = DOMPurify.sanitize(content);
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: clean,
      }}
    />
  );
};

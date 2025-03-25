import { useMemo } from 'react';
import { LexicalEditor, EditorState, $getRoot } from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from './error-boundary';
import './editor.styles.css';

import Theme from './theme';
import ToolbarPlugin from './plugins/toolbar.plugin';
import TreeViewPlugin from './plugins/tree-view.plugin';

const placeholder = 'Enter some rich text...';

interface IEditorProps {
  namespace?: string;
  state?: string;
  onChange?: (value: string) => void;
}

const parser = new DOMParser();

export const Editor = ({ namespace, state, onChange }: IEditorProps) => {
  const editorConfig = useMemo(
    () => ({
      editorState: (editor: LexicalEditor) => {
        editor.update(() => {
          state &&
            $getRoot().append(
              ...$generateNodesFromDOM(
                editor,
                parser.parseFromString(state, 'text/html')
              )
            );
        });
      },
      namespace: namespace ?? 'editor',
      nodes: [],
      onError(error: Error) {
        throw error;
      },
      theme: Theme,
    }),
    [namespace, state]
  );

  console.log(editorConfig);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            placeholder={
              <div className='editor-placeholder'>{placeholder}</div>
            }
            contentEditable={
              <ContentEditable
                className='editor-input'
                aria-placeholder={placeholder}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
          <OnChangePlugin
            onChange={(editorState: EditorState, editor: LexicalEditor) => {
              editorState.read(() => {
                const htmlString = $generateHtmlFromNodes(editor, null);
                console.log('htmlString', htmlString);
                onChange && onChange(htmlString);
              });
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
};

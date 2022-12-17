import dynamic from "next/dynamic";
// import ReactMarkdown from "react-markdown";
// import Markdown from 'markdown-to-jsx';
const Markdown = dynamic<any>(() => import("markdown-to-jsx"), { ssr: false });
const ReactMarkdown = dynamic<any>(() => import("react-markdown"), { ssr: false });

export interface ViewerProps {
  value: string;
}

export default function Viewer(props: ViewerProps) {
  // return <ReactMarkdown>{props.value}</ReactMarkdown>;
  return <Markdown>{props.value || ''}</Markdown>
        
}

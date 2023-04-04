import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export const NextLinkMarkdown = ({
  children,
}: {
  children: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}) => {
  return <MDXRemote {...children}></MDXRemote>;
};

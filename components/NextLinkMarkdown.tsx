import ReactMarkdown from "react-markdown";
import Link from "next/link";

export const NextLinkMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) return <a {...props} />;

          return <Link href={href} {...props} />;
        },
      }}
      className="p-4"
    >
      {children}
    </ReactMarkdown>
  );
};

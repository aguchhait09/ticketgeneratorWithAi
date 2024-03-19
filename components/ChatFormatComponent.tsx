import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, styled } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";


const StyledH2 = styled("h2")`
  font-size: 30px;
  @media (max-width: 599px) {
    font-size: 18px;
  }
`;

const StyledH4 = styled("h4")`
  font-size: 20px;
  @media (max-width: 599px) {
    font-size: 18px;
  }
`;

const StyledPre = styled("pre")`
  p {
    overflow: auto;
  }
`;

const ChatFormatComponent = ({ markdown }: { markdown: string }) => {

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => toast.success("Copied successfully!"))
      .catch(() => toast.error("Error occured to copy the content.."));
  };

  const handleLinkClick = (link: string) => {
    if (link) {
      window.open(link, link, "height=700,width=550");
    }
  };

  return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, children }: any) {
            if (inline) {
              return <code>{children}</code>;
            } else {
              return (
                <div style={{ position: "relative" }}>
                  <SyntaxHighlighter language="javascript">
                    {children as string}
                  </SyntaxHighlighter>
                  <IconButton
                    style={{
                      position: "absolute",
                      top: 30,
                      right: 20,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                      height: "20px"
                    }}
                    onClick={() => handleCopyContent(children as string)}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </div>
              );
            }
          },
          a({ href, children }) {
            return (
              <a href="javascript:void(0)" onClick={() => handleLinkClick(href as string)}>
                {children}
              </a>
            );
          },
          h2(props) {
            return <StyledH2 {...props} />;
          },
          h4(props) {
            return <StyledH4 {...props} />;
          },
          pre(props) {
            return (
              <StyledPre>
                <p>{props.children}</p>
              </StyledPre>
            );
          }
        }}
      >
        {markdown?.replaceAll(``,"")}
      </ReactMarkdown>
  );
};

export default ChatFormatComponent;

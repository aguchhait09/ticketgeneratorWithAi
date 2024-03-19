import React, { useState } from "react";
import { styled, Paper, Grid, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import ChatFormatComponent from "@/components/ChatFormatComponent";
import { OpenAitInterface } from "@/typescript/interface/response.interface";
import { axiosInstance } from "@/api/axiosInstance";
// import Markdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const { vscDarkPlus } = require("react-syntax-highlighter/dist/cjs/styles/prism");


const ChatBubble = styled(Paper)(({ theme, isAssistant }: any) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  width: "auto",
  borderRadius: isAssistant ? "20px 20px 0 20px" : "20px 20px 20px 0",
  backgroundColor: isAssistant ? "#f2f2f2" : "#00b39f",
  color: isAssistant ? "#000" : "#fff",
}));

const ChatCodeBlock = styled("div")(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(2),
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
}));

const CodeSnippet = styled("code")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
}));

const CopyButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  alignSelf: "flex-end",
  marginTop: theme.spacing(1),
}));

const CodeType = styled("div")(({ theme }) => ({
  backgroundColor: "#333",
  color: "#fff",
  padding: theme.spacing(0.5, 1),
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
}));

const Chat = () => {
  const [messages, setMessages] = useState<OpenAitInterface>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = [...messages, { role: "user", content: input }];
    setMessages(userMessage as any);
    setInput("");

    const response = await openAiApi(userMessage as any);
    const aiMessage = response?.data?.choices[0]?.message?.content?.trim();

    setMessages([...userMessage, { role: "assistant", content: aiMessage }]);
  };

  const openAiApi = async (userInput: string) => {
    const response = await axiosInstance.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0125",
        messages: userInput,
      },
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${process.env.AUTHORIZATION_KEY}`,
      //   },
      // }
    );
    console.log("OpenAI API Response:", response.data);
    return response;
  };

  console.log('env', process.env.AUTHORIZATION_KEY);
  

  const copyCodeSnippet = (codeSnippet: any) => {
    navigator.clipboard.writeText(codeSnippet);
    toast.success("Code is copied to clipboard!");
  };

  return (
    <Paper>
      <Grid container direction="column" spacing={2}>
        {messages.map((message, index) => (
          <Grid
            item
            key={index}
            style={{
              alignSelf: message.role === "assistant" ? "flex-start" : "flex-end",
            }}
          >
            <ChatBubble >
            {/* {renderMessage(message)} */}
            <ChatFormatComponent markdown={message?.content}/>
            </ChatBubble>
          </Grid>
        ))}
      </Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <TextField
            multiline
            rows={2}
            variant="outlined"
            placeholder="Type a message..."
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Chat;

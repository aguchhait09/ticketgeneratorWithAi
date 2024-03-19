import React, { useState } from "react";
import usemutation, { useMutation } from "@tanstack/react-query";
import { textGenerationFunc } from "@/api/functions";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField, Typography, styled } from "@mui/material";

const StyledTypography = styled(Typography)`
  font-family: Times New Roman;
`;

const index = () => {
  const [messages, setMessage] = useState<any>([]);
  const [input, setInput] = useState("Enhance the text: ");

  // const {mutate, data: openAiData} = useMutation({
  //   mutationFn: textGenerationFunc
  // })
  // console.log('data', openAiData);

  // Message to ChatBox
  const sendMessage = async () => {
    const userMsg = [...messages, { role: "user", content: input }];
    setMessage(userMsg);
    setInput("");

    // mutate(userMsg, {
    //   onSuccess: ()=>{
    //     setMessage([
    //       ...userMsg,
    //       {role: 'assistance', content: openAiData?.data?.choices[0]?.message?.content?.trim()}
    //    ])
    //   }
    // })

    const response = await openAiApi(userMsg);
    setMessage([
      ...userMsg,
      {
        content: response?.data?.choices[0]?.message?.content?.trim(),
        role: "assistant",
      },
    ]);
  };

  const openAiApi = async (userInput: any) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0125",
        messages: userInput,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
      }
    );
    console.log("OpenAI API Response:", response.data);
    return response;
  };

  return (
    <div>
      <div>
        {messages.map((message: any, index: number) => (
          <StyledTypography
            key={index}
            sx={{
              color: message.role === "assistant" ? "#ff0000" : "	#008000",
            }}
          >
            <span>{`${message.role}: `}</span>
            {message.role === "assistant" && <span>{message.content}</span>}
            {message.role !== "assistant" && message.content}
          </StyledTypography>
        ))}
      </div>
      <div>
        <TextField
          multiline
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={sendMessage} type="submit" variant="contained" sx={{m: 1.5}}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default index;

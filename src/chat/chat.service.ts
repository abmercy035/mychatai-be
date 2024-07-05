/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

@Injectable()
export class ChatService {

  create(createChatDto: CreateChatDto) {
    async function run() {
      // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
      const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: 100000,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      };
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });
      const chat = model.startChat({
        history: createChatDto.messages
      });
      const history = await chat.getHistory();
      await chat.sendMessage(createChatDto.newMessage);
      const contents = [...history];
      return (contents)
    }
    return run();
  }
}

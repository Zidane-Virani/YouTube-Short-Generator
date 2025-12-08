import { NextResponse } from 'next/server';
import textToSpeech from "@google-cloud/text-to-speech";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FireBaseConfig";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
    const {text, id} = await req.json()
    const storageRef = ref(storage, 'yt_short_generator/'+id+'.mp3');

    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };
      const [response] = await client.synthesizeSpeech(request);
      
      const audioBuffer = Buffer.from(response.audioContent, 'binary');
      await uploadBytes(storageRef, audioBuffer, {
        contentType: 'audio/mp3',
      });
      const url = await getDownloadURL(storageRef);
      console.log('Audio content written to file: output.mp3');

    return NextResponse.json({ result: url });

}
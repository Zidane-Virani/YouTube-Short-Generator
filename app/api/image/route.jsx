import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FireBaseConfig";
import axios from "axios";



export async function POST(req) {
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    });
  
    const { prompt } = await req.json(); 

    const input = {
      prompt: prompt,
      width: 1024,
      height: 1280,
      num_outputs: 1,
    };

    console.log("Creating prediction for prompt:", prompt);

    // Create prediction to get actual Replicate URLs
    const prediction = await replicate.predictions.create({
      version: "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      input: input
    });

    console.log("Prediction created, ID:", prediction.id);

    // Wait for completion
    let result = await replicate.predictions.get(prediction.id);
    while (result.status !== "succeeded" && result.status !== "failed") {
      await new Promise(resolve => setTimeout(resolve, 500));
      result = await replicate.predictions.get(prediction.id);
      console.log("Prediction status:", result.status);
    }

    if (result.status === "failed") {
      console.error("Replicate prediction failed:", result.error);
      return NextResponse.json({ error: result.error || "Prediction failed" }, { status: 500 });
    }

    const base64Data = await conversion(result.output?.[0]);
    const dataUrl = `data:image/png;base64,${base64Data}`;
    
    const fileName = "yt_short_generator/"+Date.now()+".png";
    const storageRef = ref(storage, fileName);
    await uploadString(storageRef, dataUrl, 'data_url')
    
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Image uploaded to Firebase Storage:", downloadUrl);
    
    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: error.message || "Failed to generate image" }, { status: 500 });
  }
}

const conversion = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(response.data).toString('base64');
    return base64Image;
  } catch(error) {
    console.error("Error converting image:", error);
    return null;
  }
}
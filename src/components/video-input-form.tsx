import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
<<<<<<< HEAD
import { api } from "@/lib/axios";
=======
>>>>>>> bdc6f9dc04c2b03d3f605a52ad12e5f073e198ae

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const promptImputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectecFile = files[0];

    setVideoFile(selectecFile);
  }

  async function convertVideoToAudio(video: File) {
    console.log("Convert started.");

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on("progress", (progress) => {
      console.log("Convert progress:" + Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    console.log("Convert finish");

    return audioFile;
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptImputRef.current?.value;
<<<<<<< HEAD
=======
    console.log(prompt);
>>>>>>> bdc6f9dc04c2b03d3f605a52ad12e5f073e198ae

    if (!videoFile) {
      return;
    }

    //converter video em audio

    const audioFile = await convertVideoToAudio(videoFile);
<<<<<<< HEAD
    console.log(audioFile, prompt);

    //enviar para o servidor
    const data = new FormData();

    data.append("file", audioFile);

    const response = await api.post("/videos", data);

    const videoId = response.data.video.id;

    await api.post(`/videos/${videoId}}/transcription'`, {
      prompt,
    });

    console.log("finalizou");
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

=======
    console.log(audioFile);
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

>>>>>>> bdc6f9dc04c2b03d3f605a52ad12e5f073e198ae
  return (
    <form onSubmit={handleUploadVideo} className="space-y-6 w-full">
      <label
        htmlFor="video"
        className="border flex rounded-md aspect-video cursor-poiter border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/10"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="w-full h-full object-cover rounded-md pointer-events-none"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um Video
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-1">
        <Label htmlFor="transcription_prompt">Prompt de Transcrição</Label>
        <Textarea
          ref={promptImputRef}
          id="transcription_prompt"
          className="h-28 leading-relaxed resize-none"
          placeholder="Inclua palavras chaves mencionadas no video separadas por vírgula"
        ></Textarea>
      </div>

      <Button type="submit" className="w-full">
        Carregar Video
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}

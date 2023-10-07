import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";

export function VideoInputForm() {

    const [videoFile, setVideoFile] = useState<File | null>(null)

    function handleFileSeleceted(event: ChangeEvent<HTMLInputElement>){

        const { files } = event.currentTarget
        
        if(!files) {
            return
        }

        const selectecFile = files[0]

        setVideoFile(selectecFile)
    }

    

    return (
        <form className="space-y-6 w-full">
        <label
          htmlFor="video"
          className="border flex rounded-md aspect-video cursor-poiter border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/10"
        >
          {videoFile ? 'Video Selecionado' : (
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
          onChange={handleFileSeleceted}
        />

        <Separator />

        <div className="space-y-1">
          <Label htmlFor="transcription_prompt">
            Prompt de Transcrição
          </Label>
          <Textarea
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
    )
}
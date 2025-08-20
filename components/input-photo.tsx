"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export function InputPhoto({
  id = "photo",
  photo,
  setPhoto,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  id?: string;
  photo?: File | null;
  setPhoto: (file: File | null) => void;
}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      setPhoto(files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={props.accept ?? "image/*"}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        {...props}
      />

      {photo ? (
        <div
          className={cn(
            "relative flex w-full items-center justify-center text-center",
            "border-input h-24 gap-1.5 rounded-xl border bg-white transition-colors",
            className,
          )}
        >
          <span className="truncate text-base font-medium" title={photo.name}>
            {photo.name}
          </span>
          <Button
            type="button"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setPhoto(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="bg-foreground hover:bg-destructive size-5 rounded-full text-white"
          >
            <XIcon className="size-3 stroke-4" />
          </Button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer?.files ?? null);
          }}
          className={cn(
            "flex w-full items-center justify-center text-center select-none",
            "border-input h-24 rounded-xl border bg-white transition-colors",
            isDragging && "border-ring bg-primary/5 border-dashed",
            className,
          )}
        >
          <span className="space-x-2 px-4 text-base">
            <label
              htmlFor={id}
              className="text-primary cursor-pointer underline underline-offset-2"
            >
              Upload a file
            </label>
            <span className="text-muted-foreground">
              {" "}
              or drag and drop here
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

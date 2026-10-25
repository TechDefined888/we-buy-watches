"use client";

import { useId, useState, type ChangeEvent } from "react";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type PhotoUploadStepProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

export default function PhotoUploadStep({
  files,
  onChange,
}: PhotoUploadStepProps) {
  const id = useId();
  const [error, setError] = useState("");

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);

    // Allow the same file to be selected again after removal.
    event.target.value = "";

    if (selectedFiles.length === 0) {
      return;
    }

    const uniqueFiles = selectedFiles.filter(
      (file, index, selected) =>
        !files.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        ) &&
        selected.findIndex(
          (candidate) =>
            candidate.name === file.name &&
            candidate.size === file.size &&
            candidate.lastModified === file.lastModified,
        ) === index,
    );

    if (files.length + uniqueFiles.length > MAX_FILES) {
      setError("Please select no more than five photographs in total.");
      return;
    }

    if (
      uniqueFiles.some((file) => !ALLOWED_TYPES.includes(file.type))
    ) {
      setError("Please use JPG, PNG or WebP image files.");
      return;
    }

    if (
      uniqueFiles.some(
        (file) => file.size === 0 || file.size > MAX_FILE_SIZE,
      )
    ) {
      setError(
        "Each photograph must be larger than 0 bytes and no more than 10 MB.",
      );
      return;
    }

    onChange([...files, ...uniqueFiles]);
    setError("");
  }

  function removeFile(index: number) {
    onChange(files.filter((_, fileIndex) => fileIndex !== index));
    setError("");
  }

  return (
    <fieldset className="min-w-0">
      <legend className="text-xl font-medium tracking-[-0.02em] text-[#211A26] sm:text-2xl">
        Watch Photographs
      </legend>

      <p className="mt-3 text-sm leading-7 text-[#211A26]/75">
        Add clear photographs to help the participating dealer
        understand your timepiece.
      </p>

      <div className="mt-6 rounded-xl bg-[#F7F0E3] p-5">
        <p className="text-sm font-medium text-[#211A26]">
          Useful photographs include:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#211A26]/75">
          <li>The dial and front of the watch.</li>
          <li>The case back, bracelet and clasp.</li>
          <li>Any visible wear or damage.</li>
          <li>The box and papers, if available.</li>
        </ul>

        <p className="mt-4 text-xs leading-6 text-[#211A26]/75">
          Keep personal details and unique serial numbers out of
          photographs. Please do not include identification documents.
        </p>
      </div>

      <div className="mt-7">
        <label
          htmlFor={`${id}-photos`}
          className="block text-sm font-medium text-[#211A26]"
        >
          Select watch photographs
        </label>

        <p
          id={`${id}-help`}
          className="mt-2 text-xs leading-6 text-[#211A26]/75"
        >
          JPG, PNG or WebP. Up to five photographs, maximum 10 MB
          each. Selecting a file does not upload it.
        </p>

        <input
          id={`${id}-photos`}
          name="watchPhotos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFiles}
          aria-describedby={`${id}-help ${
            error ? `${id}-error` : ""
          }`.trim()}
          aria-invalid={error ? true : undefined}
          className="mt-4 block w-full rounded-lg border border-[#30104B]/20 bg-white p-3 text-sm text-[#211A26] file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#30104B] file:px-4 file:py-3 file:text-sm file:font-medium file:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
        />

        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-3 text-sm leading-6 text-[#A12626]"
          >
            {error}
          </p>
        )}
      </div>

      <p
        role="status"
        className="mt-5 text-sm text-[#211A26]/75"
      >
        {files.length} of {MAX_FILES} photographs selected.
      </p>

      {files.length > 0 && (
        <ul
          aria-label="Selected photographs"
          className="mt-4 space-y-3"
        >
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-[#30104B]/10 p-4"
            >
              <div className="min-w-0">
                <p className="break-all text-sm font-medium text-[#211A26]">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-[#211A26]/70">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="min-h-11 shrink-0 rounded px-3 text-xs font-semibold text-[#30104B] underline underline-offset-4 hover:bg-[#F7F0E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30104B]"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}
"use client";

import { createIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage, Spinner } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err) {
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issues {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type { FileId } from "../backend";
import { useActor } from "./useActor";

export function useUploadFile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blob,
      filename,
    }: { blob: ExternalBlob; filename: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return await actor.uploadFile(blob, filename);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
}

export function useResizeImage() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      fileId,
      width,
      height,
    }: { fileId: FileId; width: number; height: number }) => {
      if (!actor) throw new Error("Actor not initialized");
      return await actor.resizeImage(fileId, BigInt(width), BigInt(height));
    },
  });
}

export function useConvertFormat() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      fileId,
      format,
    }: { fileId: FileId; format: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return await actor.convertFormat(fileId, format);
    },
  });
}

export function useCompressFile() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (fileId: FileId) => {
      if (!actor) throw new Error("Actor not initialized");
      return await actor.compressFile(fileId);
    },
  });
}

export function useDownloadFile(fileId: FileId | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["file", fileId],
    queryFn: async () => {
      if (!actor || !fileId) return null;
      return await actor.downloadFile(fileId);
    },
    enabled: !!actor && !isFetching && !!fileId,
  });
}

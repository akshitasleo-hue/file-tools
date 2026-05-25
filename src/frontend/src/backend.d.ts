import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface FileData {
    blob: ExternalBlob;
    createdAt: Time;
    filename: string;
}
export type FileId = string;
export interface backendInterface {
    cleanupFiles(): Promise<void>;
    compressFile(fileId: FileId): Promise<ExternalBlob>;
    convertFormat(fileId: FileId, format: string): Promise<ExternalBlob>;
    downloadFile(fileId: FileId): Promise<FileData>;
    resizeImage(fileId: FileId, width: bigint, height: bigint): Promise<ExternalBlob>;
    uploadFile(blob: ExternalBlob, filename: string): Promise<FileId>;
}

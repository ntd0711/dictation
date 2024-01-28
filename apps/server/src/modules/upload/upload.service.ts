import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { StoredFile } from '@server/entity/entities/StoredFile';
import { downloadFileFromUrl, getFileHash } from '@server/utils';
import * as Minio from 'minio';
export enum IdMinioFolder {
  PublicImages = 'image',
  Avatar = 'avatar',
  Subtitle = 'subtitle',
  AudioFile = 'audio_file',
}

export interface AudioFile {
  fieldname: 'audio';
  originalname: string;
  encoding: string;
  mimetype: 'audio/mpeg';
  buffer: Buffer;
  size: number;
}

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(StoredFile)
    private readonly storedFileRepository: EntityRepository<StoredFile>,
    private em: EntityManager
  ) {}

  private getClient(): Minio.Client {
    return new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_API_PORT),
      useSSL: process.env.NODE_ENV === 'production',
      accessKey: process.env.MINIO_ACCESSKEY,
      secretKey: process.env.MINIO_SECRETKEY,
    });
  }

  async uploadAvatar(url: string) {
    const file = await downloadFileFromUrl(url);
    const client = this.getClient();
    const hash = getFileHash();
    const key = `${IdMinioFolder.Avatar}/${hash}.png`;
    const minioResponse = await client.putObject(
      process.env.MINIO_BUCKET,
      key,
      file
    );
    console.log({ minioResponse, fileAvatar: file });

    const filePath = `${process.env.MINIO_PROTOCOL}://${
      process.env.MINIO_ENDPOINT
    }${process.env.MINIO_API_PORT ? `:${process.env.MINIO_API_PORT}` : ''}/${
      process.env.MINIO_BUCKET
    }/${key}`;

    const storedFile = this.storedFileRepository.create({
      name: hash,
      path: filePath,
      hash: hash,
      key: key,
    });

    await this.em.persistAndFlush(storedFile);
    return storedFile;
  }

  async uploadAudioFile(file: AudioFile) {
    const [fileName, extension] = file.originalname;
    const client = this.getClient();
    const hash = getFileHash();
    const key = `${IdMinioFolder.AudioFile}/${hash}.mp3`;
    const minioResponse = await client.putObject(
      process.env.MINIO_BUCKET,
      key,
      file.buffer
    );

    const filePath = `${process.env.MINIO_PROTOCOL}://${
      process.env.MINIO_ENDPOINT
    }${process.env.MINIO_API_PORT ? `:${process.env.MINIO_API_PORT}` : ''}/${
      process.env.MINIO_BUCKET
    }/${key}`;

    const storedFile = this.storedFileRepository.create({
      name: fileName,
      path: filePath,
      hash: hash,
      key: key,
    });

    // await this.em.persistAndFlush(storedFile);
    return storedFile;
  }

  async minioDownload(name: string) {
    const client = this.getClient();
    const chunks = [];
    const stream = await client.getObject(process.env.MINIO_BUCKET, name);
    console.log(stream);
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString();
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import firebase from '../configs/firebase.config';
import { v4 as uuid } from 'uuid';
import { FileRepository } from '../repositories/file.repository';
import { APIDto } from 'src/dto/api.dto';
import config from '../configs';
import { async } from 'rxjs';

@Injectable()
export class FileService {
  private readonly bucket;

  constructor(private readonly fileRepository: FileRepository) {
    this.bucket = firebase.storage().bucket();
  }

  uploadFile = async (parameters: Express.Multer.File) => {
    const extension =
      parameters.originalname.split('.')[
        parameters.originalname.split('.').length - 1
      ];
    const filename = `${uuid()}.${extension}`;

    await this.uploadFileToGCS(parameters, filename);

    return new APIDto(
      await this.fileRepository.insert({
        filename_disk: filename,
        type: parameters.mimetype,
        url: `${config.apiUrl}/file/${filename}`,
      }),
    );
  };

  readFile = async (filename: string) => {
    const gcsFile = await this.bucket.file(filename);
    const file = await this.fileRepository.findOneBy({
      filename_disk: filename,
    });

    return {
      type: file.type,
      buffer: await this.streamToBuffer(gcsFile.createReadStream()),
    };
  };

  streamToBuffer = async (stream) => {
    return new Promise((resolve, reject) => {
      const data = [];

      stream.on('data', (chunk) => {
        data.push(chunk);
      });

      stream.on('end', () => {
        resolve(Buffer.concat(data));
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
  };

  private uploadFileToGCS = async (
    parameters: Express.Multer.File,
    filename: string,
  ) =>
    new Promise<void>((resolve, reject) => {
      const file = this.bucket.file(filename);
      const stream = file.createWriteStream({
        metadata: {
          contentType: parameters.mimetype,
        },
      });

      stream.on('error', (err) => {
        reject(new BadRequestException(err));
      });

      stream.on('finish', () => {
        resolve();
      });

      stream.end(parameters.buffer);
    });
}

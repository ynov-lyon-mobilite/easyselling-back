import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseTokenGuard } from 'src/guards/firebase-token.guard';
import { ApiFile } from '../decorators/ApiFile';

@Controller('file')
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(FirebaseTokenGuard)
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiSecurity('Bearer')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  @Get(':filename')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  async readFile(@Res() res, @Param('filename') filename: string) {
    const { buffer, type } = await this.fileService.readFile(filename);

    res.writeHead(200, { 'Content-Type': type });
    res.end(buffer);
  }
}

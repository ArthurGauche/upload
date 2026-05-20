import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UseFilters } from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import {diskStorage} from 'multer';
import { MulterExceptionFilter } from './multer-exception.filter';

@Controller('arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}

    @Post('upload')
  @UseFilters(MulterExceptionFilter)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/tiff','image/webp'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.tiff'];
        const fileExt = extname(file.originalname).toLowerCase();

        if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(fileExt)) {
          return callback(new BadRequestException('Formato de arquivo não permitido. Apenas JPG, PNG e TIFF são aceitos.'), false);
        }

        callback(null, true);
      },
      // Se ultrapassar 5MB, o Multer dispara um erro tratado pelo filtro acima.
      storage: diskStorage({
        destination: './drive',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    return this.arquivoService.create(file);
  }
  @Get()
  findAll() {
    return this.arquivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arquivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArquivoDto: UpdateArquivoDto) {
    return this.arquivoService.update(+id, updateArquivoDto);
  }

  @Delete(':filename')
  removeByFilename(@Param('filename') filename: string) {
    return this.arquivoService.removeByFilename(filename);
  }
}
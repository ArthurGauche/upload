import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs';

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive'; //volta para a pasta drive

  constructor() {
    if (!fs.existsSync(this.pastaUpload)) { //se não existir a pasta drive, ele cria
      fs.mkdirSync(this.pastaUpload, { recursive: true });
    }
  }
  //Retorna dados do arquivo em após o upload
  create(arquivo: Express.Multer.File) {
    return {//Retorna quando envia arquivo
      message: 'Aruivo enviado com sucesso!',
      filename: arquivo.originalname,
      originalname: arquivo.originalname,
      size: arquivo.size,
    };
  }

  findAll() {
    try {
      const files = fs.readdirSync(this.pastaUpload);
      const fileList = files.map(
        (filename) => {
          const stats = fs.statSync(`${this.pastaUpload}/${filename}`);

        return {
          filename,
          size: stats.size,
          criado: stats.birthtime,
        };
      });
      return {
        total:fileList.length,
        files:fileList,
      };
    } catch (error) {
      throw new BadRequestException('Não foi possivel listar os arquivos')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }

  update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return `This action updates a #${id} arquivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} arquivo`;
  }
}

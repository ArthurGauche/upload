import { ArquivoService } from './arquivo.service';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
export declare class ArquivoController {
    private readonly arquivoService;
    constructor(arquivoService: ArquivoService);
    uploadFile(file: Express.Multer.File): {
        message: string;
        filename: string;
        originalname: string;
        size: number;
    };
    findAll(): {
        total: number;
        files: {
            filename: string;
            size: number;
            criado: Date;
        }[];
    };
    findOne(id: string): string;
    update(id: string, updateArquivoDto: UpdateArquivoDto): string;
    removeByFilename(filename: string): {
        message: string;
    };
}

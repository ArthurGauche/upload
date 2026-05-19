import { ArquivoService } from './arquivo.service';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
export declare class ArquivoController {
    private readonly arquivoService;
    constructor(arquivoService: ArquivoService);
    uploadFile(file: Express.Multer.File): void;
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
    remove(id: string): string;
}

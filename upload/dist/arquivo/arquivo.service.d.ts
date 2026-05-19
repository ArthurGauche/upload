import { UpdateArquivoDto } from './dto/update-arquivo.dto';
export declare class ArquivoService {
    private readonly pastaUpload;
    constructor();
    create(arquivo: Express.Multer.File): {
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
    findOne(id: number): string;
    update(id: number, updateArquivoDto: UpdateArquivoDto): string;
    remove(id: number): string;
}

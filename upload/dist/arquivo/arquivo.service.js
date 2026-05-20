"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArquivoService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
let ArquivoService = class ArquivoService {
    pastaUpload = './drive';
    constructor() {
        if (!fs.existsSync(this.pastaUpload)) {
            fs.mkdirSync(this.pastaUpload, { recursive: true });
        }
    }
    create(arquivo) {
        return {
            message: 'Aruivo enviado com sucesso!',
            filename: arquivo.originalname,
            originalname: arquivo.originalname,
            size: arquivo.size,
        };
    }
    findAll() {
        try {
            const files = fs.readdirSync(this.pastaUpload);
            const fileList = files.map((filename) => {
                const stats = fs.statSync(`${this.pastaUpload}/${filename}`);
                return {
                    filename,
                    size: stats.size,
                    criado: stats.birthtime,
                };
            });
            return {
                total: fileList.length,
                files: fileList,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Não foi possivel listar os arquivos');
        }
    }
    findOne(id) {
        return `This action returns a #${id} arquivo`;
    }
    update(id, updateArquivoDto) {
        return `This action updates a #${id} arquivo`;
    }
    remove(id) {
        return `This action removes a #${id} arquivo`;
    }
    removeByFilename(filename) {
        try {
            const filePath = `${this.pastaUpload}/${filename}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return { message: `Arquivo ${filename} removido com sucesso` };
            }
            throw new common_1.BadRequestException('Arquivo não encontrado');
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao remover arquivo: ' + error.message);
        }
    }
};
exports.ArquivoService = ArquivoService;
exports.ArquivoService = ArquivoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ArquivoService);
//# sourceMappingURL=arquivo.service.js.map
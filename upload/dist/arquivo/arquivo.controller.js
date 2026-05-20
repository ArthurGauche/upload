"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArquivoController = void 0;
const common_1 = require("@nestjs/common");
const arquivo_service_1 = require("./arquivo.service");
const update_arquivo_dto_1 = require("./dto/update-arquivo.dto");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const multer_exception_filter_1 = require("./multer-exception.filter");
let ArquivoController = class ArquivoController {
    arquivoService;
    constructor(arquivoService) {
        this.arquivoService = arquivoService;
    }
    uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('Nenhum arquivo enviado.');
        }
        return this.arquivoService.create(file);
    }
    findAll() {
        return this.arquivoService.findAll();
    }
    findOne(id) {
        return this.arquivoService.findOne(+id);
    }
    update(id, updateArquivoDto) {
        return this.arquivoService.update(+id, updateArquivoDto);
    }
    removeByFilename(filename) {
        return this.arquivoService.removeByFilename(filename);
    }
};
exports.ArquivoController = ArquivoController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseFilters)(multer_exception_filter_1.MulterExceptionFilter),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/tiff', 'image/webp'];
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.tiff'];
            const fileExt = (0, path_1.extname)(file.originalname).toLowerCase();
            if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(fileExt)) {
                return callback(new common_1.BadRequestException('Formato de arquivo não permitido. Apenas JPG, PNG e TIFF são aceitos.'), false);
            }
            callback(null, true);
        },
        storage: (0, multer_1.diskStorage)({
            destination: './drive',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_arquivo_dto_1.UpdateArquivoDto]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "removeByFilename", null);
exports.ArquivoController = ArquivoController = __decorate([
    (0, common_1.Controller)('arquivo'),
    __metadata("design:paramtypes", [arquivo_service_1.ArquivoService])
], ArquivoController);
//# sourceMappingURL=arquivo.controller.js.map
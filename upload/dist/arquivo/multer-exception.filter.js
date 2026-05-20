"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let MulterExceptionFilter = class MulterExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        if (exception.message && exception.message.includes('FILE_TOO_LARGE')) {
            return response.status(400).json({
                statusCode: 400,
                message: 'Arquivo maior que 5MB',
                error: 'Bad Request',
            });
        }
        if (exception instanceof common_1.BadRequestException) {
            return response.status(400).json(exception.getResponse());
        }
        return response.status(500).json({
            statusCode: 500,
            message: 'Erro ao processar arquivo',
            error: 'Internal Server Error',
        });
    }
};
exports.MulterExceptionFilter = MulterExceptionFilter;
exports.MulterExceptionFilter = MulterExceptionFilter = __decorate([
    (0, common_1.Catch)()
], MulterExceptionFilter);
//# sourceMappingURL=multer-exception.filter.js.map
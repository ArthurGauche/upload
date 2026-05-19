"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArquivoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_arquivo_dto_1 = require("./create-arquivo.dto");
class UpdateArquivoDto extends (0, mapped_types_1.PartialType)(create_arquivo_dto_1.CreateArquivoDto) {
}
exports.UpdateArquivoDto = UpdateArquivoDto;
//# sourceMappingURL=update-arquivo.dto.js.map
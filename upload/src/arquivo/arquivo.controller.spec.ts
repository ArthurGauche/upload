import { Test, TestingModule } from '@nestjs/testing';
import { ArquivoController } from './arquivo.controller';
import { ArquivoService } from './arquivo.service';

describe('ArquivoController', () => {
  let arquivoController: ArquivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArquivoController],
      providers: [ArquivoService],
    }).compile();

    arquivoController = module.get<ArquivoController>(ArquivoController);
  });

  describe('findAll', () => {
    it('should return files list', () => {
      expect(arquivoController.findAll()).toBeDefined();
    });
  });
});
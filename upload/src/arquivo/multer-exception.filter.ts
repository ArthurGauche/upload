import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';

@Catch()
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.message && exception.message.includes('FILE_TOO_LARGE')) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Arquivo maior que 5MB',
        error: 'Bad Request',
      });
    }

    if (exception instanceof BadRequestException) {
      return response.status(400).json(exception.getResponse());
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Erro ao processar arquivo',
      error: 'Internal Server Error',
    });
  }
}

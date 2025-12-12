import { faker } from '@faker-js/faker';
import { CallHandler, ExecutionContext, Logger } from '@nestjs/common';

import { firstValueFrom, of } from 'rxjs';

import { LoggingInterceptor } from './logger.interceptor';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let context: ExecutionContext;
  let mockLoggerLog: jest.SpyInstance;

  beforeEach(() => {
    mockLoggerLog = jest
      .spyOn(Logger.prototype, 'log')
      .mockImplementation(() => {});
    interceptor = new LoggingInterceptor();

    const mockReq = {
      method: faker.internet.httpMethod(),
      url: faker.internet.url(),
      ip: faker.internet.ip(),
    };

    const mockRes = {
      statusCode: 200,
    };

    const mockedExecutionContextMake = (): ExecutionContext => ({
      getArgByIndex: jest.fn(),
      getArgs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getType: jest.fn(),
      switchToHttp: jest.fn().mockImplementation(() => ({
        getRequest: () => mockReq,
        getResponse: () => mockRes,
      })),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    });

    context = mockedExecutionContextMake();
  });

  afterEach(() => {
    mockLoggerLog.mockRestore();
  });

  it('should log request and response', async () => {
    const data = { message: 'Hello World' };

    const callHandler: CallHandler = {
      handle: () => of(data),
    };

    await firstValueFrom(interceptor.intercept(context, callHandler));

    expect(mockLoggerLog).toHaveBeenCalledWith(
      expect.stringMatching(/Incoming Request: \w+ /),
    );

    expect(mockLoggerLog).toHaveBeenCalledWith(
      expect.stringMatching(/Outgoing Response: .* Status: 200/),
    );
  });
});

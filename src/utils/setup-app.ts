import { type INestApplication, VersioningType } from '@nestjs/common';
import helmet from 'helmet';

import { LoggingInterceptor } from '../interceptors/logger/logger.interceptor';

export const setupApp = (app: INestApplication): void => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['\'self\''],
          styleSrc: ['\'self\'', '\'unsafe-inline\''],
          imgSrc: ['\'self\'', 'data:', 'validator.swagger.io'],
          scriptSrc: ['\'self\'', 'https: \'unsafe-inline\''],
        },
      },
    }),
  );
  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new LoggingInterceptor());
};

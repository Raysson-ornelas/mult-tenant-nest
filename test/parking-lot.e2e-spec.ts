import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { App } from 'supertest/types';

describe('ParkingLotController (e2e)', () => {
  let app: INestApplication<App>;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);
    databaseService.tenants = [{ id: 'tenant1', name: 'Test Tenant' }];
    databaseService.parkingLots = [];
  });

  it('/parking-lot (POST)', () => {
    return request(app.getHttpServer())
      .post('/parking-lot')
      .set('x-tenant-id', 'tenant1')
      .send({
        name: 'Test Parking Lot',
        pricePerHour: 10,
        pricePerMinute: 0.5,
      })
      .expect(201)
      .then((response) => {
        expect(response.body.name).toEqual('Test Parking Lot');
        expect(databaseService.parkingLots.length).toEqual(1);
      });
  });

  it('/parking-lot (GET)', () => {
    databaseService.parkingLots.push({
      id: '1',
      name: 'Test Parking Lot',
      tenantId: 'tenant1',
      pricePerHour: 10,
      pricePerMinute: 0.5,
    });
    return request(app.getHttpServer())
      .get('/parking-lot')
      .set('x-tenant-id', 'tenant1')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(1);
      });
  });
});

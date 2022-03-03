import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProspectStageEventSourcingDTO } from '../src/service/dto/prospect-stage-event-sourcing.dto';
import { ProspectStageEventSourcingService } from '../src/service/prospect-stage-event-sourcing.service';

describe('ProspectStageEventSourcing Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(ProspectStageEventSourcingService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all prospect-stage-event-sourcings ', async () => {
        const getEntities: ProspectStageEventSourcingDTO[] = (
            await request(app.getHttpServer())
                .get('/api/prospect-stage-event-sourcings')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET prospect-stage-event-sourcings by id', async () => {
        const getEntity: ProspectStageEventSourcingDTO = (
            await request(app.getHttpServer())
                .get('/api/prospect-stage-event-sourcings/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create prospect-stage-event-sourcings', async () => {
        const createdEntity: ProspectStageEventSourcingDTO = (
            await request(app.getHttpServer())
                .post('/api/prospect-stage-event-sourcings')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update prospect-stage-event-sourcings', async () => {
        const updatedEntity: ProspectStageEventSourcingDTO = (
            await request(app.getHttpServer())
                .put('/api/prospect-stage-event-sourcings')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update prospect-stage-event-sourcings from id', async () => {
        const updatedEntity: ProspectStageEventSourcingDTO = (
            await request(app.getHttpServer())
                .put('/api/prospect-stage-event-sourcings/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE prospect-stage-event-sourcings', async () => {
        const deletedEntity: ProspectStageEventSourcingDTO = (
            await request(app.getHttpServer())
                .delete('/api/prospect-stage-event-sourcings/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

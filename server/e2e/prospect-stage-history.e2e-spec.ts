import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProspectStageHistoryDTO } from '../src/service/dto/prospect-stage-history.dto';
import { ProspectStageHistoryService } from '../src/service/prospect-stage-history.service';

describe('ProspectStageHistory Controller', () => {
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
            .overrideProvider(ProspectStageHistoryService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all prospect-stage-histories ', async () => {
        const getEntities: ProspectStageHistoryDTO[] = (await request(app.getHttpServer()).get('/api/prospect-stage-histories').expect(200))
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET prospect-stage-histories by id', async () => {
        const getEntity: ProspectStageHistoryDTO = (
            await request(app.getHttpServer())
                .get('/api/prospect-stage-histories/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create prospect-stage-histories', async () => {
        const createdEntity: ProspectStageHistoryDTO = (
            await request(app.getHttpServer()).post('/api/prospect-stage-histories').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update prospect-stage-histories', async () => {
        const updatedEntity: ProspectStageHistoryDTO = (
            await request(app.getHttpServer()).put('/api/prospect-stage-histories').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update prospect-stage-histories from id', async () => {
        const updatedEntity: ProspectStageHistoryDTO = (
            await request(app.getHttpServer())
                .put('/api/prospect-stage-histories/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE prospect-stage-histories', async () => {
        const deletedEntity: ProspectStageHistoryDTO = (
            await request(app.getHttpServer())
                .delete('/api/prospect-stage-histories/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

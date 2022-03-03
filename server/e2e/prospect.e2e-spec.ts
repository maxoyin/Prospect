import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProspectDTO } from '../src/service/dto/prospect.dto';
import { ProspectService } from '../src/service/prospect.service';

describe('Prospect Controller', () => {
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
            .overrideProvider(ProspectService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all prospects ', async () => {
        const getEntities: ProspectDTO[] = (
            await request(app.getHttpServer())
                .get('/api/prospects')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET prospects by id', async () => {
        const getEntity: ProspectDTO = (
            await request(app.getHttpServer())
                .get('/api/prospects/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create prospects', async () => {
        const createdEntity: ProspectDTO = (
            await request(app.getHttpServer())
                .post('/api/prospects')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update prospects', async () => {
        const updatedEntity: ProspectDTO = (
            await request(app.getHttpServer())
                .put('/api/prospects')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update prospects from id', async () => {
        const updatedEntity: ProspectDTO = (
            await request(app.getHttpServer())
                .put('/api/prospects/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE prospects', async () => {
        const deletedEntity: ProspectDTO = (
            await request(app.getHttpServer())
                .delete('/api/prospects/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

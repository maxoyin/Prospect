import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AssetTypeDTO } from '../src/service/dto/asset-type.dto';
import { AssetTypeService } from '../src/service/asset-type.service';

describe('AssetType Controller', () => {
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
            .overrideProvider(AssetTypeService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all asset-types ', async () => {
        const getEntities: AssetTypeDTO[] = (
            await request(app.getHttpServer())
                .get('/api/asset-types')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET asset-types by id', async () => {
        const getEntity: AssetTypeDTO = (
            await request(app.getHttpServer())
                .get('/api/asset-types/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create asset-types', async () => {
        const createdEntity: AssetTypeDTO = (
            await request(app.getHttpServer())
                .post('/api/asset-types')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update asset-types', async () => {
        const updatedEntity: AssetTypeDTO = (
            await request(app.getHttpServer())
                .put('/api/asset-types')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update asset-types from id', async () => {
        const updatedEntity: AssetTypeDTO = (
            await request(app.getHttpServer())
                .put('/api/asset-types/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE asset-types', async () => {
        const deletedEntity: AssetTypeDTO = (
            await request(app.getHttpServer())
                .delete('/api/asset-types/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

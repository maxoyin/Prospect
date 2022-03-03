import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { EntryChannelDTO } from '../src/service/dto/entry-channel.dto';
import { EntryChannelService } from '../src/service/entry-channel.service';

describe('EntryChannel Controller', () => {
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
            .overrideProvider(EntryChannelService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all entry-channels ', async () => {
        const getEntities: EntryChannelDTO[] = (
            await request(app.getHttpServer())
                .get('/api/entry-channels')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET entry-channels by id', async () => {
        const getEntity: EntryChannelDTO = (
            await request(app.getHttpServer())
                .get('/api/entry-channels/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create entry-channels', async () => {
        const createdEntity: EntryChannelDTO = (
            await request(app.getHttpServer())
                .post('/api/entry-channels')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update entry-channels', async () => {
        const updatedEntity: EntryChannelDTO = (
            await request(app.getHttpServer())
                .put('/api/entry-channels')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update entry-channels from id', async () => {
        const updatedEntity: EntryChannelDTO = (
            await request(app.getHttpServer())
                .put('/api/entry-channels/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE entry-channels', async () => {
        const deletedEntity: EntryChannelDTO = (
            await request(app.getHttpServer())
                .delete('/api/entry-channels/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

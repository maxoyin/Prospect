import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { OnboardingStageDTO } from '../src/service/dto/onboarding-stage.dto';
import { OnboardingStageService } from '../src/service/onboarding-stage.service';

describe('OnboardingStage Controller', () => {
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
            .overrideProvider(OnboardingStageService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all onboarding-stages ', async () => {
        const getEntities: OnboardingStageDTO[] = (
            await request(app.getHttpServer())
                .get('/api/onboarding-stages')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET onboarding-stages by id', async () => {
        const getEntity: OnboardingStageDTO = (
            await request(app.getHttpServer())
                .get('/api/onboarding-stages/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create onboarding-stages', async () => {
        const createdEntity: OnboardingStageDTO = (
            await request(app.getHttpServer())
                .post('/api/onboarding-stages')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update onboarding-stages', async () => {
        const updatedEntity: OnboardingStageDTO = (
            await request(app.getHttpServer())
                .put('/api/onboarding-stages')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update onboarding-stages from id', async () => {
        const updatedEntity: OnboardingStageDTO = (
            await request(app.getHttpServer())
                .put('/api/onboarding-stages/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE onboarding-stages', async () => {
        const deletedEntity: OnboardingStageDTO = (
            await request(app.getHttpServer())
                .delete('/api/onboarding-stages/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

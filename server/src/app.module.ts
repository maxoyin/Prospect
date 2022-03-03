import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProspectModule } from './module/prospect.module';
import { GuarantorModule } from './module/guarantor.module';
import { CallModule } from './module/call.module';
import { AgentModule } from './module/agent.module';
import { OnboardingStageModule } from './module/onboarding-stage.module';
import { ProspectStageHistoryModule } from './module/prospect-stage-history.module';
import { ProspectStageEventSourcingModule } from './module/prospect-stage-event-sourcing.module';
import { EntryChannelModule } from './module/entry-channel.module';
import { AddressModule } from './module/address.module';
import { LocationModule } from './module/location.module';
import { AssetTypeModule } from './module/asset-type.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        ServeStaticModule.forRoot({
            rootPath: config.getClientPath(),
        }),
        AuthModule,
        ProspectModule,
        GuarantorModule,
        CallModule,
        AgentModule,
        OnboardingStageModule,
        ProspectStageHistoryModule,
        ProspectStageEventSourcingModule,
        EntryChannelModule,
        AddressModule,
        LocationModule,
        AssetTypeModule,
        // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}

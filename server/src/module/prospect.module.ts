import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectController } from '../web/rest/prospect.controller';
import { ProspectRepository } from '../repository/prospect.repository';
import { ProspectService } from '../service/prospect.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProspectRepository])],
    controllers: [ProspectController],
    providers: [ProspectService],
    exports: [ProspectService],
})
export class ProspectModule {}

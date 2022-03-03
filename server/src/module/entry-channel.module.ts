import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryChannelController } from '../web/rest/entry-channel.controller';
import { EntryChannelRepository } from '../repository/entry-channel.repository';
import { EntryChannelService } from '../service/entry-channel.service';

@Module({
    imports: [TypeOrmModule.forFeature([EntryChannelRepository])],
    controllers: [EntryChannelController],
    providers: [EntryChannelService],
    exports: [EntryChannelService],
})
export class EntryChannelModule {}

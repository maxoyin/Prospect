import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetTypeController } from '../web/rest/asset-type.controller';
import { AssetTypeRepository } from '../repository/asset-type.repository';
import { AssetTypeService } from '../service/asset-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([AssetTypeRepository])],
    controllers: [AssetTypeController],
    providers: [AssetTypeService],
    exports: [AssetTypeService],
})
export class AssetTypeModule {}

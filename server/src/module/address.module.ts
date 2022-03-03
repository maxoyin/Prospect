import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from '../web/rest/address.controller';
import { AddressRepository } from '../repository/address.repository';
import { AddressService } from '../service/address.service';

@Module({
    imports: [TypeOrmModule.forFeature([AddressRepository])],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
})
export class AddressModule {}

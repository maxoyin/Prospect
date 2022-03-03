import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AddressDTO } from '../../service/dto/address.dto';
import { AddressService } from '../../service/address.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/addresses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('addresses')
export class AddressController {
    logger = new Logger('AddressController');

    constructor(private readonly addressEntityService: AddressService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AddressDTO,
    })
    async getAll(@Req() req: Request): Promise<AddressDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.addressEntityService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: AddressDTO,
    })
    async getOne(@Param('id') id: number): Promise<AddressDTO> {
        return await this.addressEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create addressEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AddressDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() addressEntityDTO: AddressDTO): Promise<AddressDTO> {
        const created = await this.addressEntityService.save(addressEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Address', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update addressEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AddressDTO,
    })
    async put(@Req() req: Request, @Body() addressEntityDTO: AddressDTO): Promise<AddressDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Address', addressEntityDTO.id);
        return await this.addressEntityService.update(addressEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update addressEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AddressDTO,
    })
    async putId(@Req() req: Request, @Body() addressEntityDTO: AddressDTO): Promise<AddressDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Address', addressEntityDTO.id);
        return await this.addressEntityService.update(addressEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete addressEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Address', id);
        return await this.addressEntityService.deleteById(id);
    }
}

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
import { AssetTypeDTO } from '../../service/dto/asset-type.dto';
import { AssetTypeService } from '../../service/asset-type.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/asset-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('asset-types')
export class AssetTypeController {
    logger = new Logger('AssetTypeController');

    constructor(private readonly assetTypeEntityService: AssetTypeService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AssetTypeDTO,
    })
    async getAll(@Req() req: Request): Promise<AssetTypeDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.assetTypeEntityService.findAndCount({
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
        type: AssetTypeDTO,
    })
    async getOne(@Param('id') id: number): Promise<AssetTypeDTO> {
        return await this.assetTypeEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create assetTypeEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AssetTypeDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() assetTypeEntityDTO: AssetTypeDTO): Promise<AssetTypeDTO> {
        const created = await this.assetTypeEntityService.save(assetTypeEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'AssetType', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update assetTypeEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AssetTypeDTO,
    })
    async put(@Req() req: Request, @Body() assetTypeEntityDTO: AssetTypeDTO): Promise<AssetTypeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'AssetType', assetTypeEntityDTO.id);
        return await this.assetTypeEntityService.update(assetTypeEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update assetTypeEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AssetTypeDTO,
    })
    async putId(@Req() req: Request, @Body() assetTypeEntityDTO: AssetTypeDTO): Promise<AssetTypeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'AssetType', assetTypeEntityDTO.id);
        return await this.assetTypeEntityService.update(assetTypeEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete assetTypeEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'AssetType', id);
        return await this.assetTypeEntityService.deleteById(id);
    }
}

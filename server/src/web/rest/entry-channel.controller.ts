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
import { EntryChannelDTO } from '../../service/dto/entry-channel.dto';
import { EntryChannelService } from '../../service/entry-channel.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/entry-channels')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('entry-channels')
export class EntryChannelController {
    logger = new Logger('EntryChannelController');

    constructor(private readonly entryChannelEntityService: EntryChannelService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: EntryChannelDTO,
    })
    async getAll(@Req() req: Request): Promise<EntryChannelDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.entryChannelEntityService.findAndCount({
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
        type: EntryChannelDTO,
    })
    async getOne(@Param('id') id: number): Promise<EntryChannelDTO> {
        return await this.entryChannelEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create entryChannelEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: EntryChannelDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() entryChannelEntityDTO: EntryChannelDTO): Promise<EntryChannelDTO> {
        const created = await this.entryChannelEntityService.save(entryChannelEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EntryChannel', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update entryChannelEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EntryChannelDTO,
    })
    async put(@Req() req: Request, @Body() entryChannelEntityDTO: EntryChannelDTO): Promise<EntryChannelDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EntryChannel', entryChannelEntityDTO.id);
        return await this.entryChannelEntityService.update(entryChannelEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update entryChannelEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EntryChannelDTO,
    })
    async putId(@Req() req: Request, @Body() entryChannelEntityDTO: EntryChannelDTO): Promise<EntryChannelDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EntryChannel', entryChannelEntityDTO.id);
        return await this.entryChannelEntityService.update(entryChannelEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete entryChannelEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'EntryChannel', id);
        return await this.entryChannelEntityService.deleteById(id);
    }
}

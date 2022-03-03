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
import { ProspectDTO } from '../../service/dto/prospect.dto';
import { ProspectService } from '../../service/prospect.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prospects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('prospects')
export class ProspectController {
    logger = new Logger('ProspectController');

    constructor(private readonly prospectEntityService: ProspectService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProspectDTO,
    })
    async getAll(@Req() req: Request): Promise<ProspectDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.prospectEntityService.findAndCount({
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
        type: ProspectDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProspectDTO> {
        return await this.prospectEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create prospectEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProspectDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() prospectEntityDTO: ProspectDTO): Promise<ProspectDTO> {
        const created = await this.prospectEntityService.save(prospectEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Prospect', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update prospectEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProspectDTO,
    })
    async put(@Req() req: Request, @Body() prospectEntityDTO: ProspectDTO): Promise<ProspectDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Prospect', prospectEntityDTO.id);
        return await this.prospectEntityService.update(prospectEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update prospectEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProspectDTO,
    })
    async putId(@Req() req: Request, @Body() prospectEntityDTO: ProspectDTO): Promise<ProspectDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Prospect', prospectEntityDTO.id);
        return await this.prospectEntityService.update(prospectEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete prospectEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Prospect', id);
        return await this.prospectEntityService.deleteById(id);
    }
}

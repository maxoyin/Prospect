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
import { ProspectStageHistoryDTO } from '../../service/dto/prospect-stage-history.dto';
import { ProspectStageHistoryService } from '../../service/prospect-stage-history.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prospect-stage-histories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('prospect-stage-histories')
export class ProspectStageHistoryController {
    logger = new Logger('ProspectStageHistoryController');

    constructor(private readonly prospectStageHistoryEntityService: ProspectStageHistoryService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProspectStageHistoryDTO,
    })
    async getAll(@Req() req: Request): Promise<ProspectStageHistoryDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.prospectStageHistoryEntityService.findAndCount({
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
        type: ProspectStageHistoryDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProspectStageHistoryDTO> {
        return await this.prospectStageHistoryEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create prospectStageHistoryEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProspectStageHistoryDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(
        @Req() req: Request,
        @Body() prospectStageHistoryEntityDTO: ProspectStageHistoryDTO,
    ): Promise<ProspectStageHistoryDTO> {
        const created = await this.prospectStageHistoryEntityService.save(
            prospectStageHistoryEntityDTO,
            req.user?.login,
        );
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProspectStageHistory', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update prospectStageHistoryEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProspectStageHistoryDTO,
    })
    async put(
        @Req() req: Request,
        @Body() prospectStageHistoryEntityDTO: ProspectStageHistoryDTO,
    ): Promise<ProspectStageHistoryDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProspectStageHistory', prospectStageHistoryEntityDTO.id);
        return await this.prospectStageHistoryEntityService.update(prospectStageHistoryEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update prospectStageHistoryEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProspectStageHistoryDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() prospectStageHistoryEntityDTO: ProspectStageHistoryDTO,
    ): Promise<ProspectStageHistoryDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProspectStageHistory', prospectStageHistoryEntityDTO.id);
        return await this.prospectStageHistoryEntityService.update(prospectStageHistoryEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete prospectStageHistoryEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProspectStageHistory', id);
        return await this.prospectStageHistoryEntityService.deleteById(id);
    }
}

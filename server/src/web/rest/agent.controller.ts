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
import { AgentDTO } from '../../service/dto/agent.dto';
import { AgentService } from '../../service/agent.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/agents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('agents')
export class AgentController {
    logger = new Logger('AgentController');

    constructor(private readonly agentEntityService: AgentService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AgentDTO,
    })
    async getAll(@Req() req: Request): Promise<AgentDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.agentEntityService.findAndCount({
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
        type: AgentDTO,
    })
    async getOne(@Param('id') id: number): Promise<AgentDTO> {
        return await this.agentEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create agentEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AgentDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() agentEntityDTO: AgentDTO): Promise<AgentDTO> {
        const created = await this.agentEntityService.save(agentEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Agent', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update agentEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AgentDTO,
    })
    async put(@Req() req: Request, @Body() agentEntityDTO: AgentDTO): Promise<AgentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Agent', agentEntityDTO.id);
        return await this.agentEntityService.update(agentEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update agentEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AgentDTO,
    })
    async putId(@Req() req: Request, @Body() agentEntityDTO: AgentDTO): Promise<AgentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Agent', agentEntityDTO.id);
        return await this.agentEntityService.update(agentEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete agentEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Agent', id);
        return await this.agentEntityService.deleteById(id);
    }
}

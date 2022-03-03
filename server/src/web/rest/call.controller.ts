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
import { CallDTO } from '../../service/dto/call.dto';
import { CallService } from '../../service/call.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/calls')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('calls')
export class CallController {
    logger = new Logger('CallController');

    constructor(private readonly callEntityService: CallService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CallDTO,
    })
    async getAll(@Req() req: Request): Promise<CallDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.callEntityService.findAndCount({
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
        type: CallDTO,
    })
    async getOne(@Param('id') id: number): Promise<CallDTO> {
        return await this.callEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create callEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CallDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() callEntityDTO: CallDTO): Promise<CallDTO> {
        const created = await this.callEntityService.save(callEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Call', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update callEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CallDTO,
    })
    async put(@Req() req: Request, @Body() callEntityDTO: CallDTO): Promise<CallDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Call', callEntityDTO.id);
        return await this.callEntityService.update(callEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update callEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CallDTO,
    })
    async putId(@Req() req: Request, @Body() callEntityDTO: CallDTO): Promise<CallDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Call', callEntityDTO.id);
        return await this.callEntityService.update(callEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete callEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Call', id);
        return await this.callEntityService.deleteById(id);
    }
}

import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import BaseController from '../base.controller';
import { Request } from 'express';
import { Weight } from 'src/entities/weight.entity';
import { userJwtMatchGuard } from 'src/guards/userJwtMatch.guard';

@Controller('/:userId')
@UseGuards(userJwtMatchGuard)
export class WeightsController extends BaseController {
  constructor() {
    super();
  }

  @Get('/weights')
  async get(@Param('userId') userId: number, @Req() req: Request) {
    const user = await this.currentUser(req);
    return this.defaultOk('success', user.weights);
  }

  @Post('/weights')
  async create(@Param('userId') userId: number, @Req() req: Request) {
    const user = await this.currentUser(req);
    const weight = new Weight(req.body);
    weight.user = user;
    await weight.save();
    return this.defaultOk('success', weight);
  }

  @Patch('/weights/:weightId')
  async update(
    @Param('userId') userId: number,
    @Param('weightId') weightId: number,
    @Req() req: Request,
  ) {
    const user = await this.currentUser(req);
    const weight = await Weight.findOneBy({ id: weightId, user: user });
    weight.grantParams(req.body);
    await weight.save();
    return this.defaultOk('success', weight);
  }

  @Get('/weights/:weightId')
  async show(
    @Param('userId') userId: number,
    @Param('weightId') weightId: number,
    @Req() req: Request,
  ) {
    const user = await this.currentUser(req);
    const weight = await Weight.findOneBy({ id: weightId, user: user });
    return this.defaultOk('success', weight);
  }

  @Delete('/weights/:weightId')
  async destroy(
    @Param('userId') userId: number,
    @Param('weightId') weightId: number,
    @Req() req: Request,
  ) {
    const user = await this.currentUser(req);
    const weight = await Weight.findOneBy({ id: weightId, user: user });
    await weight.remove();
    return this.defaultOk('success');
  }
}

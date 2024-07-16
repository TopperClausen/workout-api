import { Controller, Get, Param, Req } from '@nestjs/common';
import { FoodfactsService } from 'src/services/foodfacts.service';
import BaseController from './base.controller';

@Controller('/')
export class NutritionController extends BaseController {
  constructor(private readonly foodfactsService: FoodfactsService) {
    super();
  }

  @Get('nutrition/:barcode')
  async nutrition(@Req() request: Request, @Param('barcode') barcode: string) {
    try {
      const res = await this.foodfactsService.getFromBarcode(barcode);
      if ((res as any).status_verbose === 'product found') {
        return this.defaultOk('success', { product: res });
      } else {
        this.notFound('Product not found');
      }
    } catch (e) {
      if (e?.status) {
        throw e;
      } else {
        console.log(e);
        return this.defaultError('External service error');
      }
    }
  }
}

import {
  FoodFactsErrorResponse,
  FoodFactsResponse,
} from 'src/types/foodfacts.types';

interface FoodFactsResponseWrapper {
  data: FoodFactsResponse | FoodFactsErrorResponse;
  failed: boolean;
  success: boolean;
  httpCode: number;
}

export class FoodfactsService {
  url = 'https://dk.openfoodfacts.org/api/v0/';
  headers = {
    'User-Agent': 'TopsWorkoutApp/1.0',
  };

  async getFromBarcode(
    barcode: string,
  ): Promise<FoodFactsResponse | FoodFactsErrorResponse> {
    const response = await fetch(this.url + 'product/' + barcode);
    const body = await response.json();
    return body;
  }
}

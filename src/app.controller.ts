import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import AddCurrencyRequestDto from './dtos/add-currency-request.dto';
import GetCurrencyResponseDto from './dtos/get-currency-response.dto';
import { ICurrency } from './interfaces/currency.interface';

@Controller('currencies')
@ApiTags('Currencies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all currencies' })
  @ApiOkResponse({ type: [GetCurrencyResponseDto] })
  getList(): ICurrency[] {
    return this.appService.getAllCurrencies();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a single currency by id' })
  @ApiOkResponse({ type: GetCurrencyResponseDto })
  getById(@Param('id', ParseIntPipe) currencyId: number): ICurrency {
    return this.appService.getCurrency(currencyId);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new currency' })
  @ApiCreatedResponse({ type: Number })
  addCurrency(@Body() body: AddCurrencyRequestDto): number {
    return this.appService.add(body);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Replace currency data with new data' })
  updateCurrency(
    @Param('id', ParseIntPipe) currencyId: number,
    @Body() body: AddCurrencyRequestDto,
  ): boolean {
    this.appService.update(currencyId, body);
    return true;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove a currency' })
  @ApiOkResponse({ type: Boolean })
  removeCurrency(@Param('id', ParseIntPipe) currencyId: number): boolean {
    this.appService.remove(currencyId);
    return true;
  }
}

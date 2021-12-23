import { ApiProperty } from '@nestjs/swagger';
import { ICurrency } from 'src/interfaces/currency.interface';

class GetCurrencyResponseDto implements ICurrency {
  @ApiProperty({ type: Number, required: true })
  id: number;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: Number, required: true })
  price: number;
}

export default GetCurrencyResponseDto;

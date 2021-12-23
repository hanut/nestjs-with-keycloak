import { ApiProperty } from '@nestjs/swagger';
import { ICurrency } from 'src/interfaces/currency.interface';

class AddCurrencyRequestDto implements Omit<ICurrency, 'id'> {
  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: Number, required: true })
  price: number;
}

export default AddCurrencyRequestDto;

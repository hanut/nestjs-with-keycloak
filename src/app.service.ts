import { Injectable, NotFoundException } from '@nestjs/common';
import { ICurrency } from './interfaces/currency.interface';

@Injectable()
export class AppService {
  private currencyMap = new Map<number, Omit<ICurrency, 'id'>>();

  add(newCurrency: ICurrency): number {
    const id = Date.now() + Math.round(Math.random() * 10000);
    this.currencyMap.set(id, newCurrency);
    return id;
  }

  remove(id: number): void {
    if (!this.currencyMap.has(id))
      throw new NotFoundException(
        'No currency was not found with the given id',
      );
    this.currencyMap.delete(id);
  }

  update(id: number, updatedCurrency: ICurrency): void {
    if (!this.currencyMap.has(id))
      throw new NotFoundException(
        'No currency was not found with the given id',
      );
    this.currencyMap.set(id, updatedCurrency);
  }

  getAllCurrencies(): ICurrency[] {
    const results: ICurrency[] = [];
    const entries = this.currencyMap.entries();
    for (const [id, currency] of entries) {
      results.push({ ...currency, id });
    }
    return results;
  }

  getCurrency(id: number): ICurrency {
    if (!this.currencyMap.has(id))
      throw new NotFoundException(
        'No currency was not found with the given id',
      );
    return this.currencyMap.get(id);
  }
}

import {parse} from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const perfumeCatalogs = path.join(process.cwd(), 'public/perfumes');

export async function getPerfumes() {
  const catalogs = fs.readdirSync(perfumeCatalogs);

  const promises = catalogs.map((path: string) => {
    return new Promise((resolve) => {
      const records: Perfume[] = [];
      const parser = fs.createReadStream(`${perfumeCatalogs}/${path}`).pipe(
        parse({
          columns: true,
          // CSV options if any
        })
      );

      parser.on('readable', function () {
        let record: Perfume;
        while ((record = parser.read()) !== null) {
          // Work with each record

          records.push(record);
        }
      });

      parser.on('end', function () {
        resolve(records);
      });
    });
  });

  return Promise.all(promises).then((results: any) => {
    const perfumeCatalogDictionary = new Map<string, Perfume>();
    const perfumeCatalog: Perfume[] = [].concat(...results);
    const markupPercentage = 1 + (process.env.MARKUP_PERCENTAGE as unknown as number) / 100 ?? 0;

    perfumeCatalog.forEach((perfume) => {
      const priceToNumber = +perfume.price as unknown as number;
      const newPrice = String(Math.ceil(priceToNumber * markupPercentage));

      perfumeCatalogDictionary.set(perfume.id, {...perfume, price: newPrice});
    });

    return Array.from(perfumeCatalogDictionary, ([, perfume]) => perfume);
  });
}

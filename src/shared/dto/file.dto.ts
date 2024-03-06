import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @Type(() => File)
  file?: Express.Multer.File;
}

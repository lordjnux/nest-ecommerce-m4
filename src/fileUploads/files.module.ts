import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import { FilesRepository } from './files-repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [cloudinaryConfig, FilesService, FilesRepository],
})
export class FilesModule {}

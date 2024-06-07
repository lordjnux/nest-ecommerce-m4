import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files-repository';
import { CloudinaryDto } from './dtos/cloudinary.dto';
import { plainToClass } from 'class-transformer';
import { ProductsRespository } from '../products/products-respository';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly productsRepository: ProductsRespository,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File) {
    const existProduct = await this.productsRepository.findById(id);
    if (!existProduct) throw new NotFoundException(`Product(${id}) not found`);

    const cloudinaryResult = await this.uploadImageCloudinary(file);
    const productUpdated = await this.productsRepository.updateImage(
      id,
      cloudinaryResult.secure_url,
    );
    return {
      product: {
        id: productUpdated.id,
        imgUrl: productUpdated.imgUrl,
      },
    };
  }

  async uploadImageCloudinary(file: Express.Multer.File) {
    const result = await this.filesRepository.uploadImageCloudinary(file);
    return plainToClass(CloudinaryDto, result);
  }
}

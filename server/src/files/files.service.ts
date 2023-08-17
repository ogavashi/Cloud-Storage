import * as path from 'path';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity, FileType } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.repository.createQueryBuilder('files');

    qb.where('files.userId = :userId', { userId });

    if (fileType === FileType.PHOTOS) {
      qb.andWhere('files.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('files.deletedAt IS NOT NULL');
    }

    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('files');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return qb.softDelete().execute();
  }

  async delete(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('files');

    qb.withDeleted()
      .leftJoin('files.user', 'user')
      .where('files.id IN (:...ids) AND user.id = :userId', {
        ids: idsArray,
        userId,
      });

    const qbClone = qb.clone();

    const filesToRemove = await qbClone.getRawMany();

    if (!!!filesToRemove.length) {
      return;
    }

    const fileNamesToRemove = filesToRemove.map(
      ({ files_filename }) => files_filename,
    );

    const basePath = path.join(process.cwd(), '..', 'server', 'uploads');

    fileNamesToRemove.forEach((fileName) => {
      const filePath = path.join(basePath, fileName);

      fs.unlinkSync(filePath);
    });

    return qb.delete().execute();
  }

  async restore(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('files');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return qb.restore().execute();
  }
}

import { container } from 'tsyringe';

import IStorageProvider from './StorangeProvider/models/IStorageProvider';
import DiskStorageProvider from './StorangeProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorangeProvider',
  DiskStorageProvider,
);

import Configuration from '../../config.json' with { type: 'json' };
import { AppConfig } from '../types/config';

export const appConfig: AppConfig = Configuration as AppConfig;

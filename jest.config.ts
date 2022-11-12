import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  transform: {
    '\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
};

export default config;
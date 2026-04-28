import { sharedConfig } from './shared';

type FeatureFlag = {
  DEVELOPMENT: boolean;
  STAGING: boolean;
  PRODUCTION: boolean;
};

type FlagName = 'residueDebugger' | 'newsPage';

const flags: Record<FlagName, FeatureFlag> = {
  residueDebugger: {
    DEVELOPMENT: false,
    STAGING: false,
    PRODUCTION: false,
  },
  newsPage: {
    DEVELOPMENT: true,
    STAGING: true,
    PRODUCTION: true,
  },
};

export function isEnabled(flagName: keyof typeof flags): boolean {
  const flag = flags[flagName];
  if (!flag) {
    console.warn(`Feature flag "${flagName}" is undefined.`);
    return false;
  }

  switch (sharedConfig.appEnv) {
    case 'production':
      return flag.PRODUCTION;
    case 'staging':
      return flag.STAGING;
    case 'development':
      return flag.DEVELOPMENT;
    default:
      console.warn(
        `Unexpected app environment "${sharedConfig.appEnv}" for feature flag "${flagName}".`,
      );
      return false;
  }
}

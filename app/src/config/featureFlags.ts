type FeatureFlag = {
  DEV: boolean;
  STAGING: boolean;
  PRODUCTION: boolean;
};

const flags: Record<string, FeatureFlag> = {
  residueDebugger: {
    DEV: true,
    STAGING: false,
    PRODUCTION: false,
  },
};

export function isEnabled(flagName: keyof typeof flags): boolean {
  const flag = flags[flagName];
  if (!flag) {
    console.warn(`Feature flag "${flagName}" is undefined.`);
    return false;
  }

  const currentEnv = process.env.VERCEL_ENV || process.env.NODE_ENV;

  switch (currentEnv) {
    case 'production':
      return flag.PRODUCTION;
    case 'development':
      return flag.DEV;
    case 'preview':
      return flag.STAGING;
    default:
      console.warn(
        `Unexpected environment "${currentEnv}" for feature flag "${flagName}".`,
      );
      return false;
  }
}

import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';
import { RouterEffects } from './router.effects';
import { FavoriteEffects } from './favorite.effect';
import { ExtensionEffects } from './extension.effect';
import { AnalyticsEffects } from './analytics.effect';

export const effects: any[] = [
    UserEffects,
    SystemInfoEffects,
    RouterEffects,
    FavoriteEffects,
    ExtensionEffects,
    AnalyticsEffects,
];

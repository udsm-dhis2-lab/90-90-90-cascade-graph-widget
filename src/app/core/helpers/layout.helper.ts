import { VisualizationLayout } from '../models/layout.model';

export function getVisualizationLayout(): VisualizationLayout {
    return { rows: ['pe'], columns: ['dx'], filters: ['ou'] };
}

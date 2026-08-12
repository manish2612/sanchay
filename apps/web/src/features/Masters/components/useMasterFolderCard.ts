import { useNavigate } from '@tanstack/react-router';
import { MasterConfig, CREATION_MODES } from '../data/mastersConfig';

export function useMasterFolderCard(
  config: MasterConfig,
  onOpenSheet: (config: MasterConfig) => void
) {
  const navigate = useNavigate();

  const handleAddNew = () => {
    if (config.creationMode === CREATION_MODES.PAGE) {
      if (config.createHref) {
        navigate({ to: config.createHref });
      } else {
        navigate({ to: `${config.href}/new` });
      }
    } else {
      onOpenSheet(config);
    }
  };

  return {
    handleAddNew,
  };
}

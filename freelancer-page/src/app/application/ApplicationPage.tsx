import { ApplicationsList } from "./components/ApplicationsList";
import { ApplicationLayout } from "./layout/ApplicationLayout";
import { ApplicationDetail } from "./view/ApplicationDetail";

export const ApplicationPage = () => {
  return (
    <ApplicationLayout>
      <ApplicationsList />
      <ApplicationDetail />
    </ApplicationLayout>
  );
};

import { ZSUtility } from "../components/zero-services/zero-service-utility";
import { ZSLoginSubpage } from "../components/zero-services/ZSLoginSubpage";
import { ZSMainSubpage } from "../components/zero-services/ZSMainSubpage";
import { Layout } from "../layout/Layout";

export function ZeroServicesPage() {
  const has_logged_in = Boolean(ZSUtility.getToken());
  
  return (
    <Layout>
      { !has_logged_in && <div className="flex-1 flex items-center justify-center">
        <ZSLoginSubpage 
          onLoginSuccess={() => window.location.reload()} />
      </div> }
      { has_logged_in && <ZSMainSubpage /> }
    </Layout>
  );
}

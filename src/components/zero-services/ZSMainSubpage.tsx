import { Button, Tab, Tabs } from "@heroui/react"
import { ZSDomainNameView } from "./domain-name/ZSDomainNameView";
import { ZSUtility } from "./zero-service-utility";
import { ZSDatabaseView } from "./database/ZSDatabaseView";

interface ZSMainSubpageProps {}

export function ZSMainSubpage(props: ZSMainSubpageProps) {
  function logout() {
    ZSUtility.removeUser();
    window.location.reload();
  }


  const user = ZSUtility.getUser();

  return (
    <div className="flex-1 flex flex-col px-6 md:px-[10%] py-5 lg:py-15 pb-20 gap-10">
      <div className={`
        flex flex-col items-start gap-2
        md:flex-row md:justify-between
      `}>
        <div className="text-4xl font-bold">
          Zero Services Area
        </div>
        <Button 
          variant="flat"
          color="warning"
          onPress={logout}>
          Logout
        </Button>
      </div>
      <div>
        <span className="text-zinc-400">You're logged in as</span> <span className="font-semibold">{ user?.fullname }</span> ({ user?.email })
      </div>
      <div>
        <Tabs fullWidth aria-label="Options">
          <Tab key="domain-name" title="Domain Name">
            <ZSDomainNameView />
          </Tab>
          <Tab key="database" title="Database">
            <ZSDatabaseView />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

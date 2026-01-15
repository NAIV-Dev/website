import { Button, Link } from "@heroui/react";

interface CommunityProps {}

export function Community(props: CommunityProps) {
  return (
    <div className="flex gap-4 flex-row">
      <div className="bg-[#FFF1] p-[20px_28px] rounded-lg flex flex-col items-start gap-3 w-full md:w-[50%] lg:w-100">
        <div>
          Have any question or need a real human to discuss about NAIV? Join our Discord Server.
        </div>
        <Button 
          showAnchorIcon
          variant="bordered"
          color="warning"
          target="_blank"
          href={'https://discord.gg/rUq2SqPu'}
          as={Link}>
          NAIV Community
        </Button>
      </div>
    </div>
  );
}

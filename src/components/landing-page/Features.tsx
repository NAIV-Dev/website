import { Link } from "@heroui/react";

interface FeaturesProps { }

export function Features(props: FeaturesProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {
          [
            [
              'Open Source',
              'All tools we develop are available in a publicly accessible repository under the MIT license.',
              true
            ],
            [
              'Domain Specific Language',
              'NAIV DSL improves programmer productivity by focusing on the essential aspects of programming and product development.',
              true
            ],
            [
              'AI-Powered DSL*',
              'We use AI to help programmers generate common and repetitive tasks when designing the DSL.',
              true
            ],
            [
              'Database Visualization*',
              'Database visualizations are automatically generated based on the database structure and a layout algorithm.',
              true
            ],
            [
              'API Preview*',
              'Assists programmers in writing clear and well-structured API documentation.',
              true
            ],
            [
              'API Client Tester*',
              'NAIV includes an API tester to improve efficiency in API testing. All HTTP fields in the specification are automatically rendered into corresponding input forms.',
              true
            ],
            [
              'Object Schema*',
              'Support for custom object schemas is essential for building APIs. Object schemas are also reusable in APIs and other nested schemas.',
              true
            ],
            [
              'Code Generator',
              'One of the main purposes of NAIV is to programmatically generate non-essential code. We have developed code generators for several programming languages.',
              true
            ],
            [
              'Free Subdomain *.d.naiv.dev',
              'We support students and tech enthusiasts by providing free limited subdomain names.',
              false
            ],
            [
              'Managed MySQL Database (Free Tier)',
              'We reserve part of our servers for free-tier MySQL databases, intended for learning and testing purposes only.',
              false
            ]
          ].map(([title, desc, zero_services], i: number) => (
            <div
              className="flex flex-col gap-2 bg-[#0006] rounded-lg p-[14px_18px]"
              key={i}>
              {!zero_services && <Link href={'/zero'} className="text-yellow-500">
                Zero Services
              </Link>}
              <div className="font-semibold">
                {title}
              </div>
              <div className="text-zinc-400">
                {desc}
              </div>
            </div>
          ))
        }
      </div>
      <div className="text-sm text-zinc-300">
        *available on VSCode/VSCodium Extension "Naiv Developer Tools"
      </div>
    </div>
  );
}

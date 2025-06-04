import { SidebarHeader } from "@/components/ui/sidebar"

const AuraLogo = () => (
  <svg width="32" height="32" viewBox="0 0 753 293" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask0_1750_4953"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="17"
      y="17"
      width="232"
      height="260"
    >
      <path
        d="M144.599 273.304C137.421 277.447 128.579 277.447 121.401 273.304L29.4174 220.196C22.2401 216.053 17.8186 208.395 17.8186 200.107V93.893C17.8186 85.6054 22.2401 77.9473 29.4174 73.8034L121.401 20.6965C128.579 16.5527 137.421 16.5527 144.599 20.6965L236.582 73.8034C243.76 77.9473 248.181 85.6054 248.181 93.8932V200.107C248.181 208.395 243.76 216.053 236.582 220.196L144.599 273.304Z"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_1750_4953)">
      <path
        d="M248.215 213.5L133 280L17.7849 213.5L78.884 178.235C112.372 158.906 153.628 158.906 187.116 178.235L248.215 213.5Z"
        fill="url(#paint0_linear_1750_4953)"
      />
      <path
        d="M133 14V84.4894C133 123.17 153.639 158.912 187.14 178.249L248.215 213.5V80.5L133 14Z"
        fill="url(#paint1_linear_1750_4953)"
      />
      <path
        d="M133 14V84.4894C133 123.17 112.361 158.912 78.8602 178.249L17.7849 213.5V80.5L133 14Z"
        fill="url(#paint2_linear_1750_4953)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1750_4953"
        x1="133"
        y1="280"
        x2="133"
        y2="24.7422"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6F7CEE" />
        <stop offset="1" stopColor="#4B5ADB" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1750_4953"
        x1="248.608"
        y1="79.4769"
        x2="29.1577"
        y2="213.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF96B6" />
        <stop offset="1" stopColor="#ED6891" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1750_4953"
        x1="22.5078"
        y1="85.1038"
        x2="249.631"
        y2="213.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BC8CEC" />
        <stop offset="1" stopColor="#AC77E2" />
      </linearGradient>
    </defs>
  </svg>
)

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <div className="flex items-center justify-center p-4">
        <AuraLogo />
      </div>
    </SidebarHeader>
  )
}

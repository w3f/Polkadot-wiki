(self.webpackChunk=self.webpackChunk||[]).push([[8100],{3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>u,kt:()=>m});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=o,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||r;return n?a.createElement(h,i(i({ref:t},u),{},{components:n})):a.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},32202:(e,t,n)=>{"use strict";n.r(t),n.d(t,{frontMatter:()=>l,contentTitle:()=>s,metadata:()=>p,toc:()=>u,default:()=>d});var a=n(22122),o=n(19756),r=(n(67294),n(3905)),i=["components"],l={id:"build-node-management",title:"Node Management",sidebar_label:"Node Management"},s=void 0,p={unversionedId:"build-node-management",id:"build-node-management",isDocsHomePage:!1,title:"Node Management",description:"This page contains basic information about running a Parity Polkadot client. There are a lot of ways",source:"@site/../docs/build-node-management.md",sourceDirName:".",slug:"/build-node-management",permalink:"/docs/build-node-management",editUrl:"https://github.com/w3f/polkadot-wiki/edit/master/docs/build-node-management.md",version:"current",lastUpdatedBy:"Danny Salman",lastUpdatedAt:1626359862,formattedLastUpdatedAt:"7/15/2021",frontMatter:{id:"build-node-management",title:"Node Management",sidebar_label:"Node Management"},sidebar:"docs",previous:{title:"Integrating Assets",permalink:"/docs/build-integrate-assets"},next:{title:"Node Interaction",permalink:"/docs/build-node-interaction"}},u=[{value:"Basic Node Operations",id:"basic-node-operations",children:[]},{value:"File Structure",id:"file-structure",children:[]},{value:"Deployment Tools",id:"deployment-tools",children:[]},{value:"Monitoring and Telemetry",id:"monitoring-and-telemetry",children:[]}],c={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This page contains basic information about running a Parity Polkadot client. There are a lot of ways\nto obtain/run a client, e.g. compiling from source, running in Docker, or downloading a binary. This\nguide will always refer to the executable as ",(0,r.kt)("inlineCode",{parentName:"p"},"polkadot"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Always refer to the client's help ",(0,r.kt)("inlineCode",{parentName:"strong"},"polkadot --help")," for the most up-to-date information.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Other client implementation teams: Feel free to make a PR to this page with instructions (or a\nlink to instructions) for your client.")),(0,r.kt)("p",null,"If you are trying to run a validator, refer to this tutorial\n",(0,r.kt)("a",{parentName:"p",href:"/docs/maintain-guides-how-to-validate-polkadot"},"here"),"."),(0,r.kt)("h2",{id:"basic-node-operations"},"Basic Node Operations"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Selecting a chain")),(0,r.kt)("p",null,"Use the ",(0,r.kt)("inlineCode",{parentName:"p"},"--chain <chainspec>")," option to select the chain. Can be ",(0,r.kt)("inlineCode",{parentName:"p"},"polkadot"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"kusama"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"westend"),",\n",(0,r.kt)("inlineCode",{parentName:"p"},"rococo"),", or a custom chain spec. By default, the client will start Polkadot. Watch\n",(0,r.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=i9vNCHz6wO4"},"How a single codebase can power four different blockchains"),"\nto learn more about how the chain selection works internally."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Archive node")),(0,r.kt)("p",null,"An archive node does not prune any block or state data. Use the ",(0,r.kt)("inlineCode",{parentName:"p"},"--pruning archive")," flag. Certain\ntypes of nodes like validators must run in archive mode. Likewise, all\n",(0,r.kt)("a",{parentName:"p",href:"/docs/build-protocol-info/#events"},"events")," are cleared from state in each block, so if you want to\nstore events then you will need an archive node."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"To upgrade a node, please refer to this\n",(0,r.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=5LtcdBR9F40&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=5"},"video"))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Exporting blocks")),(0,r.kt)("p",null,"To export blocks to a file, use ",(0,r.kt)("inlineCode",{parentName:"p"},"export-blocks"),". Export in JSON (default) or binary\n(",(0,r.kt)("inlineCode",{parentName:"p"},"--binary true"),")."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"polkadot export-blocks --from 0 <output_file>\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"RPC ports")),(0,r.kt)("p",null,"Use the ",(0,r.kt)("inlineCode",{parentName:"p"},"--rpc-external")," flag to expose RPC ports and ",(0,r.kt)("inlineCode",{parentName:"p"},"--ws-external")," to expose websockets. Not all\nRPC calls are safe to allow and you should use an RPC proxy to filter unsafe calls. Select ports\nwith the ",(0,r.kt)("inlineCode",{parentName:"p"},"--rpc-port")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"--ws-port")," options. To limit the hosts who can access, use the\n",(0,r.kt)("inlineCode",{parentName:"p"},"--rpc-cors")," option."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Execution")),(0,r.kt)("p",null,"The Parity Polkadot client implements a ",(0,r.kt)("a",{parentName:"p",href:"/docs/learn-polkadot-host"},"Polkadot Host")," and a native\nruntime. The runtime must compile to WebAssembly and is stored on-chain. If the client's runtime is\nthe same spec as the runtime that is stored on-chain, then the client will execute blocks using the\nclient binary. Otherwise, the client will execute the Wasm runtime from the chain."),(0,r.kt)("p",null,"Therefore, when syncing the chain, the client will execute blocks from past runtimes using their\nassociated Wasm binary. This feature also allows forkless upgrades: the client can execute a new\nruntime without updating the client."),(0,r.kt)("p",null,"Parity's Polkadot client has two Wasm execution methods, interpreted (default) and compiled. Set the\npreferred method to use when executing Wasm with ",(0,r.kt)("inlineCode",{parentName:"p"},"--wasm-execution <Interpreted|Compiled>"),". Compiled\nexecution will run much faster, especially when syncing the chain, but is experimental and may use\nmore memory/CPU. A reasonable tradeoff would be to sync the chain with compiled execution and then\nrestart the node with interpreted execution."),(0,r.kt)("h2",{id:"file-structure"},"File Structure"),(0,r.kt)("p",null,"The node stores a number of files in: ",(0,r.kt)("inlineCode",{parentName:"p"},"/home/$USER/.local/share/polkadot/chains/<chain name>/"),". You\ncan set a custom path with ",(0,r.kt)("inlineCode",{parentName:"p"},"--base-path <path>"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"keystore"))),(0,r.kt)("p",null,"The keystore stores session keys, which are important for validator operations."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/learn-keys/#session-keys"},"Polkadot documentation")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://substrate.dev/docs/en/knowledgebase/learn-substrate/session-keys"},"Substrate documentation"))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"db"))),(0,r.kt)("p",null,"The database stores blocks and the state trie. If you are running a validator node, it also stores\nGRANDPA pre-votes and pre-commits and the offchain-worker DB. Use caution when\n",(0,r.kt)("a",{parentName:"p",href:"/docs/maintain-guides-how-to-upgrade"},"migrating validator nodes")," to avoid equivocation. If you want to\nstart a new machine without resyncing, you can stop your node, back up the DB, and move it to a new\nmachine."),(0,r.kt)("p",null,"To delete your DB and re-sync from genesis, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"polkadot purge-chain\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Validators should sync using the RocksDb backend. This is implicit by default, but can\nbe explicit by passing the ",(0,r.kt)("inlineCode",{parentName:"p"},"--database RocksDb")," flag. In the future, it is recommended to switch\nto using the faster and more efficient ParityDb option. Switching between database backends will\nrequire a resync."),(0,r.kt)("p",{parentName:"blockquote"},"If you want to test out ParityDB you can add the flag ",(0,r.kt)("inlineCode",{parentName:"p"},"--database paritydb"),".")),(0,r.kt)("h2",{id:"deployment-tools"},"Deployment Tools"),(0,r.kt)("p",null,"Web3 Foundation maintains ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/w3f/polkadot-deployer"},"Polkadot Deployer"),", which\nallows you to create local or remote cloud deployments of Polkadot nodes. See the README for\ninstructions."),(0,r.kt)("p",null,"Validators, see the ",(0,r.kt)("a",{parentName:"p",href:"/docs/maintain-guides-how-to-use-polkadot-validator"},"secure setup guide")," for\ninformation specific to deploying validator nodes."),(0,r.kt)("h2",{id:"monitoring-and-telemetry"},"Monitoring and Telemetry"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Node status")),(0,r.kt)("p",null,"You can check the node's health via RPC with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -H "Content-Type: application/json" --data \'{ "jsonrpc":"2.0", "method":"system_health", "params":[],"id":1 }\' localhost:9933\xa0\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Logs")),(0,r.kt)("p",null,"The Polkadot client has a number of log targets. The most interesting to users may be:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"afg")," (Al's Finality Gadget - GRANDPA consensus)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"babe")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"telemetry")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"txpool")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"usage"))),(0,r.kt)("p",null,"Other targets include:\n",(0,r.kt)("inlineCode",{parentName:"p"},"db, gossip, peerset, state-db, state-trace, sub-libp2p, trie, wasm-executor, wasm-heap"),"."),(0,r.kt)("p",null,"The log levels, from least to most verbose, are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"error")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"warn")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"info")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"debug")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trace"))),(0,r.kt)("p",null,"All targets are set to ",(0,r.kt)("inlineCode",{parentName:"p"},"info")," logging by default. You can adjust individual log levels using the\n",(0,r.kt)("inlineCode",{parentName:"p"},"--log (-l short)")," option, for example ",(0,r.kt)("inlineCode",{parentName:"p"},"-l afg=trace,sync=debug")," or globally with ",(0,r.kt)("inlineCode",{parentName:"p"},"-ldebug"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Telemetry & Metrics")),(0,r.kt)("p",null,"The Parity Polkadot client connects to telemetry by default. You can disable it with\n",(0,r.kt)("inlineCode",{parentName:"p"},"--no-telemetry"),", or connect only to specified telemetry servers with the ",(0,r.kt)("inlineCode",{parentName:"p"},"--telemetry-url")," option\n(see the help options for instructions). Connecting to public telemetry may expose information that\nputs your node at higher risk of attack. You can run your own, private\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/paritytech/substrate-telemetry"},"telemetry server")," or deploy a\n",(0,r.kt)("inlineCode",{parentName:"p"},"substrate-telemetry")," instance to a Kubernetes cluster using\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/w3f/substrate-telemetry-chart"},"this Helm chart"),"."),(0,r.kt)("p",null,"The node also exposes a Prometheus endpoint by default (disable with ",(0,r.kt)("inlineCode",{parentName:"p"},"--no-prometheus"),"). Substrate\nhas a\n",(0,r.kt)("a",{parentName:"p",href:"https://substrate.dev/docs/en/tutorials/visualize-node-metrics/"},"vizualizing node metrics tutorial"),"\nwhich uses this endpoint."))}d.isMDXComponent=!0}}]);
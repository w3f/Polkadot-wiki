---
id: maintain-guides-how-to-setup-sentry-node
title: 设置哨兵节点
sidebar_label: 设置哨兵节点
---

本教程假设你已经设置好验证人并且想把你的节点提高女巫攻击或 DDOs 防御保护。这个跟 [polkadot secure validator](https://github.com/w3f/polkadot-secure-validator) 配置一样。

我们会一步一步把验证人设置在 VPN 网络内。验证人只会与哨兵节点沟通并与网络分隔，从而减低你的验证人被入侵机会。

## VPN 安装 & 设置

我们会使用 Wireguard 作为 VPN。 Wireguard 是快速和安全的 VPN ，它使用最新的密码学。如果你有兴趣想了解更多关于 Wireguard，前往[这里](https://www.wireguard.com/)。在我们前往下一步之前，先设置防火墙并打开所需要的端口。

```bash
# ssh port
ufw allow 22/tcp
# wireguard port
ufw allow 51820/udp
# libp2p port (注意: 只有哨兵节点需要)
ufw allow 30333/tcp
ufw enable
# 再次检查防火墙规则
ufw verbose
```

### 1. 安装 Wirguard

```bash
# install linux headers
apt install linux-headers-$(uname -r)
add-apt-repository ppa:wireguard/wireguard
apt-get update # you can skip this on Ubuntu 18.04
apt-get install wireguard
```

### 2. 生成密钥

这里有二个指令当你设置 Wireguard 时会经常使用，`wg` 是设置程序用作管理 Wireguard 隧道接口，而 `wg-quick` 是用于启动或停止。

需要生成公钥/私钥对，请执行以下指令:

```bash
cd /etc/wireguard
umask 077
wg genkey | sudo tee privatekey | wg pubkey | sudo tee publickey
```

你会看到 `publickey` 和 `privatekey` 已经创建了。从只看名称 `publickey` 包含了公钥而 `privatekey`包含了私钥对。

### 3. 设置

在 `/etc/wireguard/` 目录下创建 `wg0.conf` 文档，这将会用于设置其界面。

这是设置 **验证人** `wg0.conf` 的模版。

```bash
[Interface]
# specify the address you want to assign for this machine.
Address = 10.0.0.1/32
# the private key you just generated
PrivateKey = 8MeWtQjBrmYazzwni7s/9Ow37U8eECAfAs0AIuffFng=
# listening port of your server
ListenPort = 51820
# if you use wg to add a new peer when running, it will automatically
# save the newly added peers to your configuration file
# without requiring a restart
SaveConfig = true

# Public Node A
[Peer]
# replace it to the public node A public key
PublicKey = Vdepw3JhRKDytCwjwA0nePLFiNsfB4KxGewl4YwAFRg=
# public ip address for your public node machine
Endpoint = 112.223.334.445:51820
# replace it to the public node A interface address
AllowedIPs = 10.0.0.2/32
# keep the connection alive by sending a handshake every 21 seconds
PersistentKeepalive = 21
```

> 注意：在本指南中，我们仅设置了 1 个对等点(公开节点)

您需要在您的  **哨兵节点** 中再次执行之前的步骤(1和2)，但 `wg0.onf`配置文件会是像这样：

```bash
[Interface]
Address = 10.0.0.2/32
PrivateKey = eCii0j3IWi4w0hScc8myUj5QjXjjt5rp1VVuqlEmM24=
ListenPort = 51820
SaveConfig = true

# Validator
[Peer]
# replace this with the validator public key
PublicKey = iZeq+jm4baF3pTWR1K1YEyLPhrfpIckGjY/DfwCoKns=
# public ip address of the validator
Endpoint = 55.321.234.4:51820
# replace it with the validator interface address
AllowedIPs = 10.0.0.1/32
PersistentKeepalive = 21
```

### 4. 测试连接

如果一切顺利，您已准备好测试连接。

要启动 VPN 隧道接口，请在您的 `验证人` 和 `哨兵节点` 中执行以下指令。

```bash
wg-quick up wg0

# The console would output something like this
#[#] ip link add wg0 type wireguard
#[#] wg setconf wg0 /dev/fd/63
#[#] ip -4 address add 10.0.0.1/24 dev wg0
#[#] ip link set mtu 1420 up dev wg0
```

您可以通过运行 `wg` 来检查接口状态:

```bash
# Output
 interface: wg0
  public key: iZeq+jm4baF3pTWR1K1YEyLPhrfpIckGjY/DfwCoKns=
  private key: (hidden)
  listening port: 51820

peer: Vdepw3JhRKDytCwjwA0nePLFiNsfB4KxGewl4YwAFRg=
  endpoint: 112.223.334.445:51820
  allowed ips: 10.0.0.2/32
  latest handshake: 18 seconds ago
  transfer: 580 B received, 460 B sent
  persistent keepalive: every 25 seconds
```

然后您可以使用 `ping` 来验证彼此之间的连接。

In case you want to update `wg0.conf`, run `wg-quick down wg0` to stop the interface first.

### 5. Configuring your Sentry Node and Validator

当你启动了哨兵节点和验证人的 `wg0` 接口，用一点时间看一下你将会使用标志的描述。

`--sentry <VALIDATOR_MULTIADDR>` - This would be required for your public node to be an authority as an observer. That means it acts the same as a validator node but without holding keys or signing. The difference between running a full node versus adding an extra `--sentry` flag is that a full node might not have all the data the validator needs to validate properly, while a sentry node will prioritize consensus messages to the validator. `--sentry` implies `--reserved-nodes`.

`--sentry-nodes <SENTRY_MULTIADDR>` - This is required for your validator node to specify the sentry nodes to connect to. This flag will ensure that the isolated validator node can only be reached through it's sentry nodes. `--sentry-nodes` also implies `--reserved-nodes`.

`--reserved-nodes` - The node will try to connect to these nodes and always accept connections from them, but it will still connect and accept connections from other nodes as well. This is useful if you want to have multiple validator nodes specify each other as peers.

`--reserved-only` - Only allows the connection from reserved nodes you defined.

#### P2P Networking

Nodes will use [libp2p](https://libp2p.io/) as the networking layer to establish peers and gossip messages. In order to specify nodes as peers, you must do so using a `multiaddress` (`multiaddr`), which includes a node's `Peer Identity` (`PeerId`). A validator node will need to specify the `multiaddr` of it's sentry node(s), and a sentry node will specify the `multiaddr` of it's validator node(s).

##### Multiaddr

`multiaddr` - A `multiaddr` is a flexible encoding of multiple layers of protocols into a human readable addressing scheme. For example, `/ip4/127.0.0.1/udp/1234` is a valid `multiaddr` that specifies you want to reach the 127.0.0.1 IPv4 loopback address with UDP packets on port 1234. Addresses in Substrate based chains will often take the form:

```
/ip4/<IP ADDRESS>/tcp/<P2P PORT>/p2p/<PEER IDENTITY>
```

- `IP_ADDRESS` - Unless the node is public, this will often be the ip address of the node within the private network.

- `P2P_PORT` - This is the port that nodes will send p2p messages over. By default, this will be 30333, but can be explicitly specified using the `--port <P2P_PORT>` cli flag.

- `PEER IDENTITY` - The PeerId is a unique identifier for each peer.

##### PeerId

Each peer in the network will have a private (secret) key (not to be confused with account keys or session keys) that will be used for network messaging. The secret key will have a corresponding public key, as well as a public address (`PeerId`) derived from this private key. `PeerId`' is derived from the secret key that is stored in the following directory by default:

```
/home/$USER/.local/share/polkadot/chains/<CHAIN>/network/secret_ed25519
```

Where `<CHAIN>` will be either `polkadot` for Polkadot, `ksmcc3` for Kusama, or `westend2` for Westend.

If the `secret_ed25519` file does not exist by the time the node is running (or is not otherwise specified), a new `secret_ed25519` will be created and used to derive a new `PeerId`.

If you want to explicitly specify the secret key to use, you can do so with the `--node-key-file <KEY_FILE>` flag, where `KEY_FILE` is the path of a file containing an unencoded 32 byte Ed25519 secret key, or the `--node-key <KEY>` flag, where `KEY` is a hex-encoded 32 byte secret key. If explicitly specifying a secret key, it is recommended to specify it as a file.

> Note: It is useful to generate or back up the `secret_ed25519` files if you want to use static addresses for sentry configurations. Otherwise you may have to dynamically find and set the `PeerId`.

You can use [subkey](https://github.com/paritytech/substrate/tree/master/bin/utils/subkey) to generate a new `secret_ed25519` as follows:

```bash
> subkey generate-node-key </PATH/SECRET_ED25519_FILE>
# Output
12D3KooWSAhdYsqrJKed3r5HKTJzpEWFUXCFmn6wv85M2woLLJpD
```

Running this will return the corresponding `PeerId` for the `secret_ed25519`.

> Note: You may see two different kinds of representations of `PeerId`s, one that looks like `12D3KooWSAhdYsqrJKed3r5HKTJzpEWFUXCFmn6wv85M2woLLJpD`, and one that looks like `QmdtiSGnqDoHrfVyxrRWuETyehMnmZJhxrnVBFyYtY7Trk`. These are two different representations of the same `secret_ed25519` key and will both work, however `Qm...` is the legacy representation. It is recommended to use the updated representation (`1D3KooW...`), otherwise warnings may be shown in the logs.

##### Retrieving `PeerId`'s

There are a couple of way to find out the `PeerId`. of the validator and sentry nodes.

You can use `subkey` to print out the corresponding `PeerId` using:

```bash
subkey inspect-node-key </PATH/SECRET_ED25519_FILE>
# Output
12D3KooWSAhdYsqrJKed3r5HKTJzpEWFUXCFmn6wv85M2woLLJpD
```

Another way is by starting the node to see the identity printed as follows:

`./polkadot --validator`

```
2020-06-13 14:42:21 Parity Polkadot
2020-06-13 14:42:21 ✌️  version 0.8.8-b2c9c149-x86_64-linux-gnu
2020-06-13 14:42:21 ❤️  by Parity Technologies <admin@parity.io>, 2017-2020
2020-06-13 14:42:21 📋 Chain specification: Polkadot CC1
2020-06-13 14:42:21 🏷  Node name: validator-node
2020-06-13 14:42:21 👤 Role: AUTHORITY
2020-06-13 14:42:21 💾 Database: RocksDb at /home/$USER/.local/share/polkadot/chains/polkadot/db
2020-06-13 14:42:21 ⛓  Native runtime: polkadot-8 (parity-polkadot-0.tx0.au0)
2020-06-13 14:42:21 📦 Highest known block at #529
2020-06-13 14:42:21 🏷  Local node identity is: 12D3KooWSAhdYsqrJKed3r5HKTJzpEWFUXCFmn6wv85M2woLLJpD (legacy representation: QmdtiSGnqDoHrfVyxrRWuETyehMnmZJhxrnVBFyYtY7Trk)
2020-06-13 14:42:21 〽️ Prometheus server started at 127.0.0.1:9615
2020-06-13 14:42:21 👶 Starting BABE Authorship worker
```

Here we can see our `PeerId` is `12D3KooWSAhdYsqrJKed3r5HKTJzpEWFUXCFmn6wv85M2woLLJpD`.

Lastly, we can also find the `PeerId` by calling the following RPC call from the same host:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_localPeerId", "params":[]}' http://localhost:9933
# Output
{"jsonrpc":"2.0","result":"12D3KooWSAhdYsqrJKed3r5HKTJzpEWFUXCFmn6wv85M2woLLJpD","id":1}
```

#### Setting Validator and Sentry Peers

After retrieving the appropriate `PeerId` of both the sentry and validator nodes, we can set them using the following flags:

Start your sentry with `--sentry` flag:

```bash
# Sentry Node
polkadot \
--name "Sentry-A" \
--sentry /ip4/VALIDATOR_VPN_ADDRESS/tcp/30333/p2p/VALIDATOR_NODE_PEER_ID
```

Start the validator with the `--valdiator` and `--sentry-nodes` flags:

```bash
# Validator Node
polkadot \
--name "Validator" \
--reserved-only \
--sentry-nodes /ip4/SENTRY_VPN_ADDRESS/tcp/30333/p2p/SENTRY_NODE_PEER_ID \
--validator
```

You should see your validator has 1 peer, that is a connection from your sentry node. Do the above steps to spin up few more if you think one sentry node is not enough.

```
2020-04-16 19:42:57 💤 Idle (1 peers), best: #1913174 (0x24f6…14f9), finalized #1913151 (0xced8…492b), ⬇ 18.0kiB/s ⬆ 4.5kiB/s
2020-04-16 19:42:58 🔍 Discovered new external address for our node: /ip4/10.0.0.164/tcp/30333/p2p/12D3KooWEnA6JqCk59k8SNShYDGDHTfdqGJLsTpZjgLRT6rAqfDg
2020-04-16 19:43:00 ✨ Imported #1913175 (0x76c0…ad3e)
2020-04-16 19:43:00 Starting parachain attestation session on top of parent 0x76c0c4649d290c840523316ac157380dd703fa1b9fb83b326756ce35ff49ad3e. Local parachain duty is None
2020-04-16 19:43:02 💤 Idle (1 peers), best: #1913175 (0x76c0…ad3e), finalized #1913172 (0x5925…15bd), ⬇ 33.0kiB/s ⬆ 7.1kiB/s
2020-04-16 19:43:07 ✨ Imported #1913176 (0xf1bc…3ace)
2020-04-16 19:43:07 Starting parachain attestation session on top of parent 0xf1bc3c7ed57070b4ad48bfc564a16827dc7486582f97abf00ff38061e4ef3ace. Local parachain duty is None
2020-04-16 19:43:07 💤 Idle (1 peers), best: #1913176 (0xf1bc…3ace), finalized #1913173 (0x4c97…e6b6), ⬇ 16.4kiB/s ⬆ 5.9kiB/s
2020-04-16 19:43:08 ✨ Imported #1913176 (0x672e…6123)
2020-04-16 19:43:12 💤 Idle (1 peers), best: #1913176 (0xf1bc…3ace), finalized #1913174 (0x24f6…14f9), ⬇ 43.7kiB/s ⬆ 29.4kiB/s
2020-04-16 19:43:13 ✨ Imported #1913177 (0x4e1b…209f)
2020-04-16 19:43:13 Starting parachain attestation session on top of parent 0x4e1b8fd258739d5784fbdf7cf156e2ebfd90159b21427b8e041a3aa73b99209f. Local parachain duty is None
2020-04-16 19:43:14 ✨ Imported #1913177 (0x9b77…67c7)
2020-04-16 19:43:17 💤 Idle (1 peers), best: #1913177 (0x4e1b…209f), finalized #1913174 (0x24f6…14f9)
```

> Note: You may have to start the sentry node first in order for the validator node to recognize it as a peer. If it does not show up as a peer, try resrtarting the validator node after the sentry is already running.

Congratulations! You have successfully set up a validator with a public facing node and now have a more secure way of running your validator.

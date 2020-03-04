---
id: maintain-guides-how-to-validate-kusama
title: 成为验证人 (Kusama)
sidebar_label: Validator Guide
---

本指南将指导您如何在 Kusama 网络上设置验证人节点。

## 首先

在主网上运行验证人有很大的责任！你不仅要对自己抵押的 KSM 负责， 还有目前提名你的提名人抵押。如果你犯了一个错误并且被削减，你的钱和声誉 将处于危险之中。但是运行验证人也有非常可观的回报，您为安全性做出了贡献，使网络更分散。

由于安全性对运行验证人至关重要，因此您最好看一下[设定安全验证人](maintain-guides-secure-validator) 资料使您了解在构建网络架构时要考虑的要素。 Web3 基金会也 会保持更新[安全验证人设置的参考](https://github.com/w3f/polkadot-secure-validator)使您也可以自己部署来使用。随着您成为验证人愈长时间，您可能使用此库作为自己的_起点_进行修改和自定义。

如果您需要帮助，请在[Kusama 验证人聊天室](https://riot.im/app/#/room/#KusamaValidatorLounge:polkadot.builders) 发问。(而中文朋友可以在微信群找 anson) 团队和其他验证人在那里帮助回答问题并提供协助。如果您还有更重要的建议，您可以在[ Kusama论坛](https://forum.kusama.network)提交。

### How Many KSM Do I Need?

Validators are elected based on [Phragmen's algorithm](learn-phragmen). To be elected into the set, you need a minimum stake behind your validator. This stake can come from yourself or from [nominators](maintain-nominator). This means that as a minimum, you will need enough KSM to set up Stash and Controller [accounts](learn-keys) with the existential deposit, plus a little extra for transaction fees. The rest can come from nominators.

**Warning:** Any KSM that you stake for your validator is liable to be slashed, meaning that an insecure or improper setup may result in loss of KSM tokens! If you are not confident in your ability to run a validator node, it is recommended to nominate your KSM to a trusted validator node instead.

## 初始设置

### Requirements

You will likely run your validator on a cloud server running Linux. You may choose whatever [VPS](#vps-list) provider that your prefer, and whatever operating system you are comfortable with. For this guide we will be using **Ubuntu 18.04**, but the instructions should be similar for other platforms.

You will not need a very powerful machine to run your validator, but you should be aware of the resource constraints. The most important resource for your validator node is networking bandwidth, followed by its storage and memory capabilities. The bare minimum requirements for a machine to run a validator are as follows:

- **存储:** 40GB - 80GB。 Kusama 对存储空间的要求不是很高，因此这范围经已可以满足所需要的要求，请记住如果链的存储持续增加，则可能需要稍后对其进行升级。
- **内存:** 2GB - 8GB。2GB 实际上是运行验证人最低的要求，小于 2GB 会使构建时间更长。 为了有更好性能，您可以将其提高到 4GB 或 8GB。
- ** 中央处理器:** 1 - 2。一个 CPU 是可以，但是2个更好。 同样地这是一种性能偏好。

On most cloud service providers, these specs are usually within the $10 - $20 per month range.

### Install Rust

Once you choose your cloud service provider and set-up your new server, the first thing you will do is install Rust.

If you have never installed Rust, you should do this first. This command will fetch the latest version of Rust and install it.

```sh
curl https://sh.rustup.rs -sSf | sh
```

Otherwise, if you have already installed Rust, run the following command to make sure you are using the latest version.

```sh
rustup update
```

Finally, run this command to install the necessary dependencies for compiling and running the Kusama node software.

```sh
sudo apt install make clang pkg-config libssl-dev build-essential
```

Note - if you are using OSX and you have [Homebrew](https://brew.sh) installed, you can issue the following equivalent command INSTEAD of the previous one:

```sh
brew install cmake pkg-config openssl git llvm
```

### Building and Installing the `polkadot` Binary

You will need to build the `polkadot` binary from the [paritytech/polkadot](https://github.com/paritytech/polkadot) repository on GitHub using the source code available in the **v0.7** branch.

You should generally use the latest **0.7.x** tag.  At the time of writing, this was **0.7.16**, but you should review the output from the "git tag" command (`git tag | grep "$v\0\.7"`) to see a list of all the potential 0.7 releases.  You should replace `v0.7.16` with the latest build (i.e., the highest number).

> 注意：如果您喜欢使用 SSH 而不是 HTTPS，则可以将下面的第一行替换为 `git clone git@github.com:paritytech/polkadot.git`。

```sh
git clone https://github.com/paritytech/polkadot.git
cd polkadot
git tag | grep "$v\0\.7"
git checkout v0.7.16
./scripts/init.sh
cargo build --release
```

This step will take a while (generally 15 - 30 minutes, depending on your hardware).

If you are interested in generating keys locally, you can also install `subkey` from the same directory. You may then take the generated `subkey` executable and transfer it to an air-gapped machine for extra security.

```sh
cargo install --force --git https://github.com/paritytech/substrate subkey
```

### Synchronize Chain Data

> **注意：**验证人节点必须以 archive 模式同步以避免被惩罚。如果您已经同步好，您必须首先运行` polkadot purge-chain `删除之前的数据库，然后确保使用` --pruning=archive `运行 Polkadot。

#### 第一次运行 Kusama 网络

You can begin syncing your node by running the following command:

```sh
./target/release/polkadot --validator
```

or

```sh
./target/release/polkadot --pruning=archive
```

if you do not want to start in validator mode right away.

**Note:** The `--pruning=archive` flag is implied by the `--validator` and `--sentry` flags, so it is only required explicitly if you start your node without one of these two options. If you do not set your pruning to archive node, even when not running in validator and sentry mode, you will need to re-sync your database when you switch.

#### 之前 Kusama CC1 的验证人

Before synchronizing the the CC2 chain data, you will need to copy your previous keystore to the new chain id in order to use the previously set session keys. If you do not do this, you will need to generate and set your session keys again.

Kusama CC1 and Kusama CC2 have different default data directories, usually located in the `$HOME/.local/share/polkadot/chains` directory on Linux based machines. For example, the default directory for Kusama CC1 is `$HOME/.local/share/polkadot/chains/ksma/keystore` while CC2 keys are located in `$HOME/.local/share/polkadot/chains/ksmcc2/keystore`.

You can easily generate the default keystore for CC2 by first starting to sync and exiitng out of your node client.

```sh
./target/release/polkadot
# Wait a few seconds for it to start up and create the data directory then press `ctrl-c`.
```

Now you can copy your old session keys into the new CC2 keystore with the next command:

```sh
cp -r $HOME/.local/share/polkadot/chains/ksma/keystore $HOME/.local/share/polkadot/chains/ksmcc2/keystore
```

If your keystore is empty, it means that the keys were not created on your node in the CC1 chain. You want to fix this. The best way to do this would be to call the `author_rotateKeys` RPC call and make sure the call is directed to your validator node (not the default Polkadot JS connection or one of the boot nodes). Before submitting the `setKeys` transaction, verify that the keys are in the new CC2 keystore. See more information in the [section below](#generating-session-keys).

After you copy your keystore into the new chains directory, you want to to inject the keys into the memory of the node. For this you can use the `author_insertKey` method for each of the four types of keys: 'babe', 'gran', 'imon', and 'para'. You can map these keys to the ones in your keystore by parsing the concatenated output of the `rotateKeys` RPC call you made the first time. They will be concatenated in order following the below struct declaration:

```rust
pub struct SessionKeys {
    #[id(key_types::GRANDPA)]
    pub grandpa: GrandpaId,
    #[id(key_types::BABE)]
    pub babe: BabeId,
    #[id(key_types::IM_ONLINE)]
    pub im_online: ImOnlineId,
    #[id(parachain::PARACHAIN_KEY_TYPE_ID)]
    pub parachain_validator: parachain::ValidatorId,
}
```

> **注意:** session 密钥在共识中是很关键，因此如果不确定节点是否有执行 ` setKeys ` 具有设定好的 session 密钥，最简单方法是生成和设置多一次，使用下面 ` rotateKeys ` 方法。小心驶得万年船！

Start your node.

```sh
./target/release/polkadot --pruning=archive
```

Depending on the size of the chain when you do this, this step may take anywhere from a few minutes to a few hours.

If you are interested in determining how much longer you have to go, your server logs (printed to STDOUT from the `polkadot` process) will tell you the latest block your node has processed and verified. You can then compare that to the current highest block via [Telemetry](https://telemetry.polkadot.io/#list/Kusama%20CC2) or the [PolkadotJS Block Explorer](https://polkadot.js.org/apps/#/explorer).

> **注意:** 如果您还没有 KSM，您只能做到这一步，直至升级到 PoS 之后。您仍然可以运行节点，但是因为在非正式发布期间轉帳是不能使用，所以您需要少数量 KSM 才能继续操作。 在 NPoS 开始之前，即使有 KSM 的人也只能表达他们_有意_成为验证人，他们现在是无法成为验证人。

## 绑定 KSM

It is highly recommended that you make your controller and stash accounts be two separate accounts. For this, you will create two accounts and make sure each of them have at least enough funds to pay the fees for making transactions. Keep most of your funds in the stash account since it is meant to be the custodian of your staking funds.

Make sure not to bond all your KSM balance since you will be unable to pay transaction fees from your bonded balance.

It is now time to set up our validator. We will do the following:

- 绑定 Stash 帐户的KSM。 这些抵押中的 KSM 是为了保护网络的安全，并可以大幅削减(惩罚)。
- 选择 Controller，Controller 是决定何时开始或停止验证的帐户。

First, go to the [Staking](https://polkadot.js.org/apps/#/staking/actions) section. Click on "Account Actions", and then the "New stake" button.

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** -选择 Stash 账户。在这个例子我们会绑定 100 milliKSMs - 确保你的 Stash 帐户拥有_至少_这个数量。当然你也可以绑定更多。
- **Controller account** - 选择你之前创建的 Controller 帐号。此帐户也需要少量 KMS 才能开始和停止验证。
- **Value bonded** - How much KSM from the Stash account you want to bond/stake. Note that you do not need to bond all of the KSM in that account. Also note that you can always bond _more_ KSM later. However, _withdrawing_ any bonded amount requires the duration of the unbonding  period. On Kusama, the unbonding period is 7 days. On Polkadot, the planned unbonding period is 28 days.
- **Payment destination** - 把奖励发送到那个帐戶，详情请看[这里](https://wiki.polkadot.network/en/latest/polkadot/learn/staking/#reward-distribution)。

Once everything is filled in properly, click `Bond` and sign the transaction with your Stash account.

After a few seconds, you should see an "ExtrinsicSuccess" message. You should now see a new card with all your accounts (note: you may need to refresh the screen). The bonded amount on the right corresponds to the funds bonded by the Stash account.

## 设置 Session 密钥

Once your node is fully synced, stop the process by pressing Ctrl-C. At your terminal prompt, you will now start running the node in validator mode with the pruning option set to `archive`.

```sh
./target/release/polkadot --validator --name "name on telemetry" --pruning=archive
```

You can give your validator any name that you like, but note that others will be able to see it, and it will be included in the list of all servers using the same telemetry server. Since numerous people are using telemetry, it is recommended that you choose something likely to be unique.

### Generating the Session Keys

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates your validator node with your Controller account on Polkadot.

#### 第一个选项: PolkadotJS-APPS

You can generate your [Session keys](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/#session-key) in the client via the apps RPC. If you are doing this, make sure that you have the PolkadotJS-Apps explorer attached to your validator node. You can configure the apps dashboard to connect to the endpoint of your validator in the Settings tab. If you are connected to a default endpoint hosted by Parity of Web3 Foundation, you will not be able to use this method since making RPC requests to this node would effect the local keystore hosted on a _public node_ and you want to make sure you are interacting with the keystore for _your node_.

Once ensuring that you have connected to your node, the easiest way to set session keys for your node is by calling the `author_rotateKeys` RPC request to create new keys in your validator's keystore. Navigate to Toolbox tab and select RPC Calls then select the author > rotateKeys() option and remember to save the output that you get back for a later step.

![Explorer RPC call](assets/guides/how-to-validate/polkadot-explorer-rotatekeys-rpc.jpg)

#### 第二个选项: CLI

If you are on a remote server, it is easier to run this command on the same machine (while the node is running with the default HTTP RPC port configured):

```sh
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the concatenation of the four public keys. Save this result for a later step.

### Submitting the `setKeys` Transaction

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates your validator with your Controller account.

Go to [Staking > Account Actions](https://polkadot.js.org/apps/#/staking/actions), and click "Set Session Key" on the bonding account you generated earlier. Enter the output from `author_rotateKeys` in the field and click "Set Session Key".

![staking-change-session](assets/guides/how-to-validate/set-session-key-1.jpg) ![staking-session-result](assets/guides/how-to-validate/set-session-key-2.jpg)

Submit this extrinsic and you are now ready to start validating.

## 验证

To verify that your node is live and synchronized, head to [Telemetry](https://telemetry.polkadot.io/#list/Kusama%20CC1) and find your node. Note that this will show all nodes on the Kusama network, which is why it is important to select a unique name!

If everything looks good, go ahead and click on "Validate" in Polkadot UI.

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg) ![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Payment preferences** - 验证人会先取下这里设定的奖励，余下那些将会与提名你的人按比例分配。

Click "Validate".

If you go to the Staking tab, you should see a list of active validators currently running on the network, as well as any nodes that have signaled their intention to be validators but have not yet been selected as being part of the current validator set. At the top of the page, it shows how many validator slots are available and how many nodes are intended to be a validator.

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking-queue.jpg)

Your node will be shown in the *next up* queue. During the [soft launch](#soft-launch) period, there will be no era changes, and your node will remain in the queue until the transition to the Proof-of-Stake validator selection.

**After soft launch:** The validator set is refreshed every era. In the next era, if there is a slot available and your node is selected to join the validator set, your node will become an active validator. Until then, it will remain in the _next up_ queue. If your validator is not selected to become part of the validator set, it will remain in the _next up_ queue until it is. There is no need to re-start if you are not selected for the validator set in a particular era. However, it may be necessary to increase the number of KSMs staked or seek out nominators for your validator in order to join the validator set.

## 非正式发布

When Kusama launches, it will be a Proof-of-Authority network, with nodes run by the Web3 Foundation. After having a sufficient _next up_ queue (50-100 validators), the network will upgrade to NPoS and allow validators into the validator set based on their stake.

**Congratulations!** If you have followed all of these steps, and been selected to be a part of the validator set, you are now running a Kusama validator! If you need help, reach out on the [Kusama forum](https://forum.kusama.network/) or in the [Kusama Validator chat](https://riot.im/app/#/room/#KusamaValidatorLounge:polkadot.builders).

## 常见问题

### Why am I unable to synchronize the chain with 0 peers?

![zero-peer](assets/guides/how-to-validate/polkadot-zero-peer.jpg)

Make sure to enable `30333` libp2p port. Eventually, it will take a little bit of time to discover other peers over the network.

### How do I clear all my chain data?

```sh
./target/release/polkadot purge-chain
```

## 云端服务器

* [OVH](https://www.ovh.com.au/)
* [Digital Ocean](https://www.digitalocean.com/)
* [Vultr](https://www.vultr.com/)
* [Linode](https://www.linode.com/)
* [Contabo](https://contabo.com/)
* [Scaleway](https://www.scaleway.com/)

## 使用 Docker

If you have Docker installed, you can use it to start your validator node without needing to build the binary. You can do this with a simple one line command:

```sh
$ docker run parity/polkadot:v0.5.0 --validator --name "name on telemetry"
```

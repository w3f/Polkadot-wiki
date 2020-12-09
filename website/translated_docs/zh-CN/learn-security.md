---
id: learn-security
title: 网络的安全
sidebar_label: 网络的安全
---

## 共享安全

共享安全(有时在文档中有时称为_集合安全性_)是考虑成为平行链并加入 Polkadot 网络的链条的独特价值主张之一。从高层次上讲，共享安全性意味着所有通过租用平行链插槽连接到 Polkadot 中继链中，将受益于中继链验证人提供的经济安全。

共享安全的概念不同于构建在桥接架构上的链间(interchain)协议。对于桥接协议，每条链都被认为是具有自主权的，必须维护自己的验证人集和经济安全性。这些协议中的一个关注点是安全的可伸缩性。 例如一种建议扩大区块链规模的是通过_山寨币进行规模扩张_，这表明交易量将随着较大市值的山寨币填补而被过滤以降低市值。这种想法的主要缺陷是，较低的市值代币所附加的经济安全性较低，更容易受到攻击。最近发生了一个51%攻击的真实例子（[1月10日的以太坊经典攻击](https://cointelegraph.com/news/ethereum-classic-51-attack-the-reality-of-proof-of-work)，其中未知的攻击者花费了219500等（约110万美元）。

Polkadot 克服了安全可伸缩性问题，因为它将所有的经济激励吸引到中继链上，并允许平行链从一开始就获得更强有力的保证。 独立公链必须付出更多的努力来提高其货币的价值，这样它就不容易受到资金充足的攻击者的攻击。

### 例子

让我们比较现有的工作量证明(Pow) 链上的标准的安全模型和 Polkadot 的共享安全性。由自己的安全模型(如比特币、zcash、以太坊及其衍生物)保护的链都必须拥有自己的独立矿工网络，并保持诚实哈希能力的竞争部分。由于挖矿计算能力逐渐集中在一个参与者手中，由此单个参与者可以控制足够的哈希能力来攻击区块链会成为现实。这意味者新链在大型矿机集团面前将无法在网络上保持安全都哈希能力。其简单的突发奇想是将散列能力从比特币转向新的、不太安全的链。随着以太坊经典（见上文）、[比特黄金](https://bitcoingold.org/responding-to-attacks/)和 [其他加密货币](https://coincentral.com/verge-suffers-51-attack-hard-forks-in-response/)上报告的攻击，[今天形成51%的攻击是可行的](https://www.crypto51.app)。

在 Polkadot 上，链间都安全性差异将不会存在。当平行链连接到 Polkadot 时，中继链验证人集将会成为该平行链状态转换的保护者。平行链只需要运行几个收集人节点，就可以让验证人知道最新的状态转换和证明/见证。 验证人然后将检查参数是否为其分配了平行链。这样新的平行链一旦发布，也就立即从 Polkadot 的整体安全性中受益。

## 常见问题

### 安全性与验证人的数量相关吗？ 平行链的数量呢？

Security is independent of the number of parachains that are connected to the Polkadot Relay Chain. The correlation of security and the number of validators exists as the higher number of validators will give the network stronger decentralization properties and make it harder to try to take down. However, the biggest indicator of the security of the network is the economic signal of the number of DOT that are bonded and staked. The greater the number of DOT staked by honest validators and nominators, the higher the minimum amount of DOT an attacker would need to acquire a validator slot.

### 平行链会需要他们自己的安全吗？平行链在什么情况下需要自己的安全性？

大多数平行链不需要担心自己的安全性，因为所有状态转换都将由 Polkadot 中继链验证人进行保护。但是，在某些情况下(被认为是更具实验性)，平行链可能需要其自身的安全性。一般来说，这些情况将围绕缺乏可用于中继链验证人的数据而展开。一个示例是，如果状态转换函数具有某些简洁性或零知识证明，那么由于中继链将没有数据，因此平行链将负责保持其数据可用。此外，对于具有自己共识的链，例如允许快速付款的链[ Blink Network ](https://www.youtube.com/watch?v=sf5GMDlG7Uk)，在准链区块有效之前，可能需要利益相关者之间达成拜占庭协议。 达成协议是必要的，因为与快速共识相关的数据对于中继链验证人而言是未知的。